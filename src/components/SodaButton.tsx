import Link from "next/link";

type SodaButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

const BUBBLES = [
  { left: "18%", delay: "0ms" },
  { left: "38%", delay: "120ms" },
  { left: "55%", delay: "60ms" },
  { left: "72%", delay: "200ms" },
] as const;

/**
 * 奶油蜜瓜苏打按钮：樱桃 + 奶油弧 + 绿色苏打主体，悬浮/按下时气泡持续上浮
 */
export function SodaButton({
  href,
  children,
  className = "",
  "aria-label": ariaLabel,
}: SodaButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex select-none items-center justify-center no-underline ${className}`}
      aria-label={ariaLabel}
    >
      <span className="relative flex min-w-[9.5rem] flex-col items-center pt-2">
        {/* 樱桃 */}
        <span
          className="absolute -top-1 left-1/2 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
          style={{
            background:
              "radial-gradient(circle at 30% 28%, #ff8b8b 0%, #d94a4a 45%, #9e2d2d 100%)",
          }}
          aria-hidden
        />

        {/* 杯缘奶油弧 */}
        <span
          className="relative z-10 -mb-2 h-4 w-[78%] rounded-t-[999px] border border-white/70 bg-gradient-to-b from-white to-[#f0f4f1] shadow-[inset_0_-2px_0_rgba(255,255,255,0.55)]"
          aria-hidden
        />

        {/* 苏打主体 */}
        <span
          className="relative z-[1] flex h-11 w-full min-w-[10rem] items-center justify-center overflow-hidden rounded-full px-8 text-[13px] font-medium tracking-[0.35em] text-white shadow-[0_10px_28px_rgba(47,143,106,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-0"
          style={{
            background:
              "linear-gradient(165deg, var(--soda-glow) 0%, var(--soda-mid) 42%, var(--soda-deep) 100%)",
          }}
        >
          <span
            className="pointer-events-none absolute inset-x-4 top-2 h-3 rounded-full bg-white/25 blur-md"
            aria-hidden
          />
          <span className="relative z-[2] drop-shadow-sm">{children}</span>

          <span
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
            aria-hidden
          >
            {BUBBLES.map((b, i) => (
              <span
                key={`soda-bubble-a-${i}`}
                className="absolute bottom-2 rounded-full bg-white/80 shadow-[0_0_1px_rgba(255,255,255,0.95)] animate-bubble-float"
                style={{
                  left: b.left,
                  width: "3px",
                  height: "3px",
                  animationDelay: b.delay,
                }}
              />
            ))}
            {BUBBLES.map((b, i) => (
              <span
                key={`soda-bubble-b-${i}`}
                className="absolute bottom-1 rounded-full bg-white/50 animate-bubble-float-delayed"
                style={{
                  left: `calc(${b.left} + 5%)`,
                  width: "2px",
                  height: "2px",
                }}
              />
            ))}
          </span>
        </span>
      </span>
    </Link>
  );
}
