import { resultsMap } from "@/data/results";

export function calculateResult(answers: string[]) {
  const counts: Record<string, number> = {};
  answers.forEach((ans) => {
    if (ans) counts[ans] = (counts[ans] || 0) + 1;
  });

  const allResults = Object.values(resultsMap);
  const normalTypes = allResults.filter(r => !r.isHidden).map(r => r.title);
  
  let maxCount = 0;
  let primaryType = normalTypes[0]; 

  Object.entries(counts).forEach(([type, count]) => {
    if (normalTypes.includes(type) && count > maxCount) {
      maxCount = count;
      primaryType = type;
    }
  });

  // 判定隐藏人格
  if (counts["凌晨两点便利店人格"] >= 2) return resultsMap["凌晨两点便利店人格"];
  if (counts["末班电车错过型"] >= 2) return resultsMap["末班电车错过型"];
  if (counts["山手线反方向人格"] >= 2) return resultsMap["山手线反方向人格"];

  // 返回完整结果对象（包含描述文案）
  return resultsMap[primaryType] || resultsMap["新宿高压运行型"];
}