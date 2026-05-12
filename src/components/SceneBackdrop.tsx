import Image from "next/image";

const BG_URL =
  "https://chatgpt.com/s/m_69fd6876c64c8191b9d1edc43cab4813";

/**
 * 全屏背景 + 20% 米白遮罩（胶片颗粒在 layout 单独层）
 */
export function SceneBackdrop() {
  return (
    <div className="fixed inset-0 z-0">
      <Image
        src={BG_URL}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-[#F9F9F7]"
        style={{ opacity: 0.2 }}
        aria-hidden
      />
    </div>
  );
}
