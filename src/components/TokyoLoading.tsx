"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingTexts = [
  "正在统计你的深夜便利店停留频率...",
  "正在检测你的东京绕路倾向...",
  "正在分析你与末班电车的距离...",
  "正在读取你的东京低电量状态...",
  "正在同步山手线运行实时坐标...",
  "正在确认下一站：新宿..."
];

export default function TokyoLoading() {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    // 初始随机选一条
    setCurrentText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
    // 每 1.5 秒换一条
    const interval = setInterval(() => {
      setCurrentText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-60" 
        style={{ backgroundImage: `url('/train-window.jpg')` }} 
      />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-8"
        >
          🚃
        </motion.div>
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[#333] text-[14px] tracking-[0.15em] font-light"
            >
              {currentText}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="mt-16 w-40 h-[1px] bg-black/5 relative overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-[#70C1A1]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "linear" }} 
          />
        </div>
      </div>
    </div>
  );
}