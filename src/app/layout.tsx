import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { SceneBackdrop } from "@/components/SceneBackdrop";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-elegant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "东京旅行情绪人格测试",
  description: "深夜便利店灯下的东京情绪侧写",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={notoSansJp.variable}>
      <body className="font-sans font-light antialiased">
        <SceneBackdrop />
        {/* 胶片颗粒：叠在背景之上、内容之下 */}
        <div className="film-grain" aria-hidden />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
