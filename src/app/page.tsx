"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function TokyoMoodHome() {
  const [isHovered, setIsHovered] = useState(false);
  
  // 气泡逻辑
  const [bubbles, setBubbles] = useState<{id: number, left: string, size: number, delay: number}[]>([]);
  
  useEffect(() => {
    // 预生成气泡，避免 hydration 错误
    const newBubbles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 80 + 10}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F7F6] flex flex-col items-center justify-center font-sans overflow-hidden px-4">
      
      {/* 1. 顶部标题：TOKYO · MOOD QUIZ */}
      <div className="text-[11px] tracking-[0.8em] text-[#AAB2B2] uppercase mb-32 select-none opacity-80">
        Tokyo · Mood Quiz
      </div>

      {/* 2. 主标题：横排还原设计稿 */}
      <div className="text-center mb-20 select-none">
        <h1 className="text-[32px] tracking-[0.8em] text-[#444] font-light mb-4 ml-[0.8em]">
          东京旅行
        </h1>
        <h2 className="text-[32px] tracking-[0.6em] text-[#444] font-light ml-[0.6em]">
          情绪人格测试
        </h2>
      </div>

      {/* 3. 中间诗意文案 */}
      <div className="text-center space-y-4 mb-44 text-[#9BA5A6] font-light text-[15px] tracking-[0.2em] leading-relaxed select-none">
        <p>末班车、雨棚、自动门的嗡鸣。</p>
        <p>像车票背面那样，轻轻记下你的东京。</p>
      </div>

      {/* 4. 核心：蜜瓜苏打气泡按钮 */}
      <Link href="/quiz">
        <motion.div 
          className="relative flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 红色小灯泡 (物理感) */}
          <motion.div 
            className="w-3 h-3 bg-[#E17070] rounded-full z-50 mb-3"
            animate={{ 
              boxShadow: isHovered ? "0 0 15px rgba(225,112,112,0.6)" : "0 0 5px rgba(225,112,112,0.2)" 
            }}
          />

          {/* 哑光奶盖 */}
          <div className="w-36 h-10 bg-white/90 rounded-t-[25px] -mt-1 z-40 border-b border-[#F0F5F2]" />

          {/* 按钮主体 (Matte Soda Capsule) */}
          <div className="relative w-64 h-20 bg-gradient-to-b from-[#8ED1B3] to-[#5BB891] rounded-[40px] flex items-center justify-center border border-white/30 shadow-[0_25px_50px_-12px_rgba(86,184,145,0.25)] overflow-hidden">
            
            {/* 气泡动效：仅在 Hover 时激活 */}
            <AnimatePresence>
              {isHovered && bubbles.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: -60, opacity: [0, 0.4, 0] }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    delay: b.delay,
                    ease: "linear" 
                  }}
                  style={{ left: b.left, width: b.size, height: b.size }}
                  className="absolute bg-white rounded-full blur-[0.5px] z-10"
                />
              ))}
            </AnimatePresence>

            <span className="text-white text-[22px] tracking-[0.6em] font-light ml-[0.6em] z-30">START</span>
            
            {/* 极淡的流光扫过 */}
            {isHovered && (
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 w-full bg-white/5 skew-x-12 z-20"
              />
            )}
          </div>

          {/* 底部柔和投影 */}
          <div className="w-52 h-6 bg-[#333]/5 blur-2xl rounded-full mt-6 opacity-60" />
        </motion.div>
      </Link>

    </main>
  );
}