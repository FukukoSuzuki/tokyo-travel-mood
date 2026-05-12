import { questions } from "@/data/questions";
import {
  HIDDEN_TYPES,
  NORMAL_TYPES,
  RESULT_BY_TYPE,
  RESULTS,
  type HiddenResultType,
  type NightKeyword,
  type NormalResultType,
  type Result,
  type ResultType,
} from "@/data/results";

export type Answer = {
  questionId: number;
  optionId: string;
};

export type CalculateResultOutput = {
  type: ResultType;
  result: Result;
  nightVibe: number;
  nightVibeBreakdown: Record<NightKeyword, number>;
  scores: Record<ResultType, number>;
};

const NIGHT_KEYWORDS: NightKeyword[] = ["深夜", "便利店", "雨天", "散步", "错过电车"];

function initScores(): Record<ResultType, number> {
  return Object.fromEntries(RESULTS.map((r) => [r.type, 0])) as Record<
    ResultType,
    number
  >;
}

function initNightBreakdown(): Record<NightKeyword, number> {
  return Object.fromEntries(NIGHT_KEYWORDS.map((k) => [k, 0])) as Record<
    NightKeyword,
    number
  >;
}

export function calculateResult(answers: Answer[]): CalculateResultOutput {
  const scores = initScores();
  const nightVibeBreakdown = initNightBreakdown();

  for (const a of answers) {
    const q = QUESTIONS.find((qq) => qq.id === a.questionId);
    if (!q) continue;

    const opt = q.options.find((oo) => oo.id === a.optionId);
    if (!opt) continue;

    for (const [t, v] of Object.entries(opt.scores)) {
      const type = t as ResultType;
      const add = typeof v === "number" ? v : 0;
      scores[type] = (scores[type] ?? 0) + add;
    }

    for (const [k, v] of Object.entries(opt.night)) {
      const key = k as NightKeyword;
      const add = typeof v === "number" ? v : 0;
      if (NIGHT_KEYWORDS.includes(key)) nightVibeBreakdown[key] += add;
    }
  }

  const nightVibe = NIGHT_KEYWORDS.reduce((sum, k) => sum + nightVibeBreakdown[k], 0);

  const hiddenPicked = pickHidden({ scores, nightVibe, nightVibeBreakdown });
  if (hiddenPicked) {
    return {
      type: hiddenPicked,
      result: RESULT_BY_TYPE[hiddenPicked],
      nightVibe,
      nightVibeBreakdown,
      scores,
    };
  }

  const normalPicked = pickNormal(scores);
  return {
    type: normalPicked,
    result: RESULT_BY_TYPE[normalPicked],
    nightVibe,
    nightVibeBreakdown,
    scores,
  };
}

function pickNormal(scores: Record<ResultType, number>): NormalResultType {
  let best: NormalResultType = "asakusa-slow";
  let bestScore = -Infinity;

  for (const t of NORMAL_TYPES) {
    const s = scores[t] ?? 0;
    if (s > bestScore) {
      bestScore = s;
      best = t;
    }
  }

  return best;
}

function pickHidden(input: {
  scores: Record<ResultType, number>;
  nightVibe: number;
  nightVibeBreakdown: Record<NightKeyword, number>;
}): HiddenResultType | null {
  const candidates: Array<{ type: HiddenResultType; weight: number }> = [];

  for (const t of HIDDEN_TYPES) {
    const r = RESULT_BY_TYPE[t];
    const unlock = r.unlock;
    if (!unlock) continue;
    if (input.nightVibe < unlock.minNightVibe) continue;

    const ok = unlock.requiredKeywords.every((k) => (input.nightVibeBreakdown[k] ?? 0) > 0);
    if (!ok) continue;

    const keywordBonus = unlock.requiredKeywords.reduce(
      (sum, k) => sum + (input.nightVibeBreakdown[k] ?? 0) * 7,
      0
    );

    const preferredBonus = (unlock.preferredNormals ?? []).reduce(
      (sum, n) => sum + (input.scores[n] ?? 0) * 4,
      0
    );

    const weight = input.nightVibe * 10 + keywordBonus + preferredBonus;
    candidates.push({ type: t, weight });
  }

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    return HIDDEN_TYPES.indexOf(a.type) - HIDDEN_TYPES.indexOf(b.type);
  });

  return candidates[0]?.type ?? null;
}

