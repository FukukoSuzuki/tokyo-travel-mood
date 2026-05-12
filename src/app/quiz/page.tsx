"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Train, Download } from 'lucide-react';

// --- 1. 题目数据 ---
const questions = [
  { id: 1, question: "东京下雨了，你更想？", options: [
      { text: "去便利店买杯热咖啡继续赶路", types: ["新宿高压运行型", "品川低电量续航型"] },
      { text: "临时躲进咖啡店坐到雨停", types: ["清澄白河晨雾型", "藏前留白感型"] },
      { text: "钻进地下商场顺便乱逛", types: ["东京站转运人生型", "池袋补给站型"] },
      { text: "撑伞继续在雨里慢慢走", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
  ]},
  { id: 2, question: "错过末班电车以后，你第一反应是？", options: [
      { text: "开始查别的回酒店路线", types: ["东京站转运人生型"] },
      { text: "去便利店买点东西等第一班车", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "干脆慢慢散步回去", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
      { text: "那就继续下一场", types: ["涩谷持续加载中型", "新宿高压运行型"] },
  ]},
  { id: 3, question: "第一次到东京，你最想先感受的是？", options: [
      { text: "巨大商圈的人流和霓虹", types: ["涩谷持续加载中型", "新宿高压运行型"] },
      { text: "安静住宅街的生活感", types: ["吉祥寺奶油云朵型"] },
      { text: "河边和旧街道的空气", types: ["藏前留白感型", "清澄白河晨雾型"] },
      { text: "夜晚电车穿过城市的感觉", types: ["东京塔信号弱型"] },
  ]},
  { id: 4, question: "东京旅行时，你最容易在哪停下脚步？", options: [
      { text: "大型百货商场", types: ["涩谷持续加载中型"] },
      { text: "热门展望台或打卡景点", types: ["原宿透明感上瘾型"] },
      { text: "24小时便利店", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "没什么人的小巷子", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
  ]},
  { id: 5, question: "东京凌晨一点时，你通常会？", options: [
      { text: "继续逛Donki", types: ["新宿高压运行型"] },
      { text: "坐在便利店吃关东煮", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "沿着河边慢慢散步", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
      { text: "回酒店休息准备明天行程", types: ["东京站转运人生型", "吉祥寺奶油云朵型"] },
  ]},
  { id: 6, question: "你更喜欢哪种旅行节奏？", options: [
      { text: "一天排满所有想去的地方", types: ["新宿高压运行型", "涩谷持续加载中型"] },
      { text: "一天只认真逛一个区域", types: ["吉祥寺奶油云朵型", "清澄白河晨雾型"] },
      { text: "走到哪算哪，随时改计划", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
      { text: "按提前查好的路线慢慢走", types: ["东京站转运人生型"] },
  ]},
  { id: 7, question: "一个人在东京吃晚饭时，你更可能？", options: [
      { text: "快速解决继续赶路", types: ["品川低电量续航型"] },
      { text: "找一家小店慢慢坐着", types: ["吉祥寺奶油云朵型"] },
      { text: "边吃边看窗外夜景", types: ["东京塔信号弱型"] },
      { text: "临时改去居酒屋喝一杯", types: ["下北泽逃亡计划型"] },
  ]},
  { id: 8, question: "你理想中的东京住宿附近应该有？", options: [
      { text: "大型换乘车站", types: ["东京站转运人生型"] },
      { text: "咖啡店和杂货店", types: ["自由之丘散步日型", "清澄白河晨雾型"] },
      { text: "24小时营业便利店", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "livehouse和小酒吧", types: ["下北泽逃亡计划型"] },
  ]},
  { id: 9, question: "旅行预算快超支时，你会？", options: [
      { text: "继续买，回去再说", types: ["原宿透明感上瘾型", "涩谷持续加载中型"] },
      { text: "认真开始记账", types: ["池袋补给站型"] },
      { text: "少吃点也想住好酒店", types: ["自由之丘散步日型"] },
      { text: "突然什么都不想买了", types: ["清澄白河晨雾型"] },
  ]},
  { id: 10, question: "你会为了什么绕远路？", options: [
      { text: "一家想去很久的店", types: ["自由之丘散步日型"] },
      { text: "路过的河边夜景", types: ["东京塔信号弱型", "藏前留白感型"] },
      { text: "突然看到的路边小店", types: ["下北泽逃亡计划型"] },
      { text: "其实根本不想绕路", types: ["东京站转运人生型"] },
  ]},
  { id: 11, question: "东京旅行里，你最怕？", options: [
      { text: "浪费时间", types: ["新宿高压运行型"] },
      { text: "店铺提前关门", types: ["原宿透明感上瘾型"] },
      { text: "行程太满没法发呆", types: ["清澄白河晨雾型"] },
      { text: "错过深夜的城市气氛", types: ["东京塔信号弱型"] },
  ]},
  { id: 12, question: "你最喜欢东京哪种街道？", options: [
      { text: "满是广告牌的大街", types: ["涩谷持续加载中型"] },
      { text: "安静的住宅区小路", types: ["吉祥寺奶油云朵型"] },
      { text: "河边和桥附近", types: ["藏前留白感型"] },
      { text: "深夜还有人的商业街", types: ["新宿高压运行型"] },
  ]},
  { id: 13, question: "东京旅行时，你的相册里最多的是？", options: [
      { text: "夜景和霓虹", types: ["东京塔信号弱型"] },
      { text: "咖啡店和美食", types: ["自由之丘散步日型"] },
      { text: "电车和街道", types: ["品川低电量续航型"] },
      { text: "朋友和热闹场面", types: ["涩谷持续加载中型"] },
  ]},
  { id: 14, question: "如果突然空出半天时间，你会？", options: [
      { text: "继续塞更多景点", types: ["新宿高压运行型"] },
      { text: "找个地方坐一下午", types: ["清澄白河晨雾型"] },
      { text: "随机坐电车出去", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
      { text: "睡一觉恢复体力", types: ["池袋补给站型"] },
  ]},
  { id: 15, question: "在东京迷路的时候，你通常会？", options: [
      { text: "立刻打开地图重新规划", types: ["东京站转运人生型"] },
      { text: "随便拐进附近的小路", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
      { text: "先找家店坐下休息", types: ["吉祥寺奶油云朵型"] },
      { text: "继续沿着现在这条路走", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
  ]},
  { id: 16, question: "东京旅行时，你最依赖什么？", options: [
      { text: "提前查好的路线", types: ["东京站转运人生型"] },
      { text: "当天突然出现的心情", types: ["下北泽逃亡计划型"] },
      { text: "体力和便利店咖啡", types: ["品川低电量续航型"] },
      { text: "同行人的临时提议", types: ["涩谷持续加载中型"] },
  ]},
  { id: 17, question: "东京电车里，你通常会？", options: [
      { text: "一直盯着换乘路线", types: ["东京站转运人生型", "品川低电量续航型"] },
      { text: "戴着耳机看窗外发呆", types: ["清澄白河晨雾型"] },
      { text: "偷偷观察别人穿搭", types: ["原宿透明感上瘾型"] },
      { text: "坐下以后直接开始补觉", types: ["池袋补给站型"] },
  ]},
  { id: 18, question: "在东京便利店里，你最容易多买什么？", options: [
      { text: "热咖啡和功能饮料", types: ["品川低电量续航型"] },
      { text: "限定甜品和小零食", types: ["原宿透明感上瘾型", "自由之丘散步日型"] },
      { text: "饭团和关东煮", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "其实只是进去吹空调", types: ["藏前留白感型"] },
  ]},
  { id: 19, question: "东京晴天时，你更想去哪？", options: [
      { text: "继续冲热门商圈", types: ["涩谷持续加载中型"] },
      { text: "去公园或河边坐着", types: ["清澄白河晨雾型", "藏前留白感型"] },
      { text: "随便找条街慢慢乱走", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
      { text: "找家甜品店休息一下", types: ["自由之丘散步日型"] },
  ]},
  { id: 20, question: "旅行结束前最后一晚，你通常会？", options: [
      { text: "疯狂补买伴手礼", types: ["原宿透明感上瘾型"] },
      { text: "回熟悉的小店看看", types: ["吉祥寺奶油云朵型"] },
      { text: "找个地方安静待一会", types: ["清澄白河晨雾型"] },
      { text: "继续在东京夜里乱走", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
  ]},
  { id: 21, question: "离开东京前的最后几个小时，你更想？", options: [
      { text: "再冲几个没去成的地方", types: ["涩谷持续加载中型", "新宿高压运行型"] },
      { text: "找家咖啡店慢慢坐着", types: ["清澄白河晨雾型", "吉祥寺奶油云朵型"] },
      { text: "继续在街上随便乱走", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格", "末班电车错过型"] },
      { text: "回便利店买最后一次宵夜", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
  ]},
];

// --- 2. 结果映射 ---
const resultsMap: any = {
  "新宿高压运行型": { title: "新宿高压运行型", area: "新宿 / 涩谷 / 池袋", time: "18:47 的晚高峰", tags: ["#东京暴走人格", "#效率至上", "#霓虹灯下的野心"], description: "你在东京很少真正停下来。\n\n地图永远开着，\n电量长期低于20%，\n却还是会在深夜临时增加新的目的地。\n\n你喜欢东京那种：\n“再快一点也没关系”的速度感。\n\n比起休息，\n你更害怕错过。" },
  "涩谷持续加载中型": { title: "涩谷持续加载中型", area: "涩谷 / 原宿 / 表参道", time: "20:16 的十字路口", tags: ["#持续加载中", "#东京高浓度玩家", "#热闹依赖"], description: "东京对你来说，\n像一个永远不会结束的新页面。\n\n你习惯在人群里快速切换情绪，\n一边赶路，\n一边被新的店、新的音乐、新的灯光吸引。\n\n你很难真正“完成”一次东京旅行。\n\n因为总会想：\n再多看一点。" },
  "东京站转运人生型": { title: "东京站转运人生型", area: "东京站 / 品川 / 秋叶原", time: "07:32 的通勤电车", tags: ["#路线规划师", "#东京生存专家", "#换乘人格"], description: "你很擅长在东京生存。\n\n提前查路线、\n计算换乘时间、\n甚至知道哪个出口离目的地最近。\n\n东京对别人来说像迷宫，\n对你来说更像一套精密系统。\n\n你总能比别人更快一步抵达。" },
  "自由之丘散步日型": { title: "自由之丘散步日型", area: "自由之丘 / 代官山 / 二子玉川", time: "14:08 的晴天午后", tags: ["#休日感人格", "#慢慢散步的人", "#东京松弛感"], description: "你喜欢东京那些“刚刚好”的时刻。\n\n不用赶时间，\n不用追热门打卡，\n只是慢慢走进一家甜品店，\n或者在街角发很久的呆。\n\n比起热闹，\n你更在意：\n这座城市有没有好好呼吸。" },
  "清澄白河晨雾型": { title: "清澄白河晨雾型", area: "清澄白河 / 藏前 / 门前仲町", time: "08:11 的阴天早晨", tags: ["#晨雾人格", "#东京留白观察者", "#低饱和生活"], description: "你喜欢东京安静的一面。\n\n阴天、\n清晨、\n河边、\n刚开门的咖啡店。\n\n你总能在东京高速运转之前，\n找到一点属于自己的留白时间。\n\n很多人来东京寻找刺激，\n而你更喜欢：\n东京短暂安静下来的瞬间。" },
  "藏前留白感型": { title: "藏前留白感型", area: "藏前 / 浅草桥 / 清澄白河", time: "16:24 的河边日落", tags: ["#留白感人格", "#东京观察系", "#安静街道收藏家"], description: "你很容易被东京里的“空白”吸引。\n\n不是热门景点，\n而是那些没有太多人注意的小店、\n旧建筑、\n河边长椅、\n或者一条突然安静下来的街道。\n\n你喜欢东京像杂志翻页一样的节奏。\n\n轻一点，\n慢一点，\n也没关系。" },
  "下北泽逃亡计划型": { title: "下北泽逃亡计划型", area: "下北泽 / 三轩茶屋 / 中目黑", time: "23:48 的末班车以后", tags: ["#逃跑人格", "#随机绕路选手", "#东京wanderer"], description: "你很容易在东京突然偏离计划。\n\n明明只是想路过，\n却会在某条小巷停下来很久。\n\n比起热门目的地，\n你更喜欢那些：\n地图上没有特别标记的地方。\n\n东京对你来说，\n更像一次长期逃亡。" },
  "吉祥寺奶油云朵型": { title: "吉祥寺奶油云朵型", area: "吉祥寺 / 西荻洼 / 阿佐谷", time: "17:36 的傍晚散步", tags: ["#奶油系人格", "#生活感收藏家", "#东京温柔派"], description: "你喜欢东京温柔的一面。\n\n公园、\n旧书店、\n杂货店、\n傍晚亮灯的小餐馆。\n\n你并不想在东京“赢”。\n\n你只是想：\n找到一个待着很舒服的地方。\n\n然后慢慢生活。" },
  "东京塔信号弱型": { title: "东京塔信号弱型", area: "中目黑 / 东京塔 / 台场", time: "00:27 的深夜电车", tags: ["#深夜人格", "#东京夜风依赖", "#情绪接收中"], description: "你总是在东京深夜变得特别敏感。\n\n耳机里的音乐、\n雨后的街道、\n便利店灯光、\n远处的东京塔。\n\n东京越安静，\n你的情绪反而越清晰。\n\n你喜欢那些：\n白天不会出现的东京时刻。" },
  "原宿透明感上瘾型": { title: "原宿透明感上瘾型", area: "原宿 / 表参道 / 银座", time: "15:02 的透明感下午", tags: ["#透明感依赖", "#东京时髦观察员", "#橱窗人格"], description: "你总会被东京里“很好看”的东西吸引。\n\n橱窗、\n穿搭、\n限定甜品、\n玻璃反光、\n某家突然出现的新店。\n\n东京对你来说，\n像一场不断更新的视觉灵感库。\n\n你很擅长：\n让自己也变成东京风景的一部分。" },
  "品川低电量续航型": { title: "品川低电量续航型", area: "品川 / 东京站 / 上野", time: "21:41 的返程电车", tags: ["#低电量续航", "#东京硬撑人格", "#疲惫但继续"], description: "你总是在快没电的时候继续前进。\n\n脚很累，\n手机也快关机，\n但还是会想着：\n“再去一个地方吧。”\n\n你很擅长东京式硬撑。\n\n哪怕状态已经见底，\n也还是会继续移动。" },
  "池袋补给站型": { title: "池袋补给站型", area: "池袋 / 上野 / 锦系町", time: "22:13 的便利店灯光", tags: ["#补给人格", "#回血型选手", "#东京续航系统"], description: "东京对你来说，\n不是一直冲刺。\n\n你知道什么时候该休息、\n什么时候该补充能量。\n\n便利店热食、\n商场座位区、\n电车上的短暂闭眼，\n都能让你重新恢复运行。\n\n你很懂：\n怎么在东京长期生存。" },
  "凌晨两点便利店人格": { isHidden: true, triggerText: "正在统计你的深夜便利店停留频率…", title: "凌晨两点便利店人格", area: "FamilyMart / Lawson", time: "02:00 的白光下", tags: ["#24小时营业依赖", "#东京深夜续命系统", "#热饮区人格"], description: "东京真正安静下来以后，\n你反而开始恢复运行。\n\n热饮区、\n关东煮、\n微波炉的提示音、\n便利店靠窗座位。\n\n你总会在那些：\n“不属于白天”的时间里，\n短暂找到安全感。" },
  "末班电车错过型": { isHidden: true, triggerText: "正在分析你与末班电车的距离…", title: "末班电车错过型", area: "山手线月台", time: "00:32 的改札口", tags: ["#深夜游荡许可", "#东京夜风依赖", "#再待一会人格"], description: "你并不讨厌错过什么。\n\n有时候，\n东京真正开始变得好看，\n反而是在：\n“已经回不去了”以后。\n\n末班车以后，\n城市会短暂露出另一层样子。" },
  "山手线反方向人格": { isHidden: true, triggerText: "正在检测你的东京绕路倾向…", title: "山手线反方向人格", area: "车厢连接处", time: "随时的突发奇想", tags: ["#绕路型选手", "#随机下车系统", "#东京wanderer"], description: "你很容易突然改变方向。\n\n原本只是路过，\n却会在某一站临时下车。\n\n你对东京的兴趣，\n从来不只是目的地。\n\n而是：\n电车开往陌生方向时的那种感觉。" }
};

const randomTips = [
  "正在统计你的深夜便利店停留频率…",
  "正在检测你的东京绕路倾向…",
  "正在分析你与末班电车的距离…",
  "正在读取你的低电量续航状态…",
  "正在计算你的东京发呆概率…"
];

// --- 3. 组件主体 ---
export default function QuizPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [scoreMap, setScoreMap] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<any[]>([]);
  const [bubbles, setBubbles] = useState<any[]>([]);
  const [testNumber, setTestNumber] = useState<number>(1);
  const cardRef = useRef<HTMLDivElement>(null);

  // 初始化首页增强版气泡
  useEffect(() => {
    if (!isStarted) {
      const b = [...Array(50)].map((_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        delay: Math.random() * 5,
        duration: 1.5 + Math.random() * 3,
        size: 1.5 + Math.random() * 6, 
        drift: (Math.random() - 0.5) * 45, 
        blur: Math.random() > 0.7 ? '1px' : '0px' 
      }));
      setBubbles(b);
    }
  }, [isStarted]);

  // 处理测试完成次数统计
  useEffect(() => {
    if (isFinished) {
      const storedCount = localStorage.getItem('tokyo_test_total_count');
      const nextCount = storedCount ? parseInt(storedCount) + 1 : 1;
      localStorage.setItem('tokyo_test_total_count', nextCount.toString());
      setTestNumber(nextCount);
    }
  }, [isFinished]);

  const currentTip = useMemo(() => {
    return randomTips[Math.floor(Math.random() * randomTips.length)];
  }, [isLoading]);

  const handleSelect = (opt: any) => {
    setHistory([...history, { scoreMap: { ...scoreMap }, index }]);
    const nextScores = { ...scoreMap };
    opt.types?.forEach((t: string) => { nextScores[t] = (nextScores[t] || 0) + 1; });
    opt.hiddenTypes?.forEach((ht: string) => { nextScores[ht] = (nextScores[ht] || 0) + 1.8; });
    setScoreMap(nextScores);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => { setIsLoading(false); setIsFinished(true); }, 3500);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setScoreMap(lastState.scoreMap);
    setIndex(lastState.index);
    setHistory(history.slice(0, -1));
  };

  const handleSaveCard = () => {
    if (typeof window !== 'undefined') {
      window.print(); 
    }
  };

  const getFinalResult = () => {
    const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
    return resultsMap[sorted[0]?.[0] || "吉祥寺奶油云朵型"];
  };

  // --- 视图渲染：首页 ---
  if (!isStarted) return (
    <main className="fixed inset-0 bg-[#F9F6F2] flex flex-col items-center justify-between p-6 overflow-hidden text-[#4A443F]">
      <div className="mt-20 text-center space-y-4">
        <p className="text-[10px] tracking-[0.8em] text-[#C4B7A6] uppercase font-light">Tokyo personality museum</p>
        <h1 className="text-[30px] font-extralight tracking-[0.3em]">东京人格测试</h1>
      </div>

      <div className="relative flex flex-col items-center">
        {/* 顶部装饰：奶油与樱桃 */}
        <div className="relative z-30 mb-[-12px] flex flex-col items-center">
          <motion.div 
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative ml-14 mb-[-6px] z-20"
          >
            {/* 樱桃梗：已修正位置锁定 */}
            <div className="absolute bottom-[10px] left-[11px] w-[2px] h-[35px] bg-[#5C3A21] origin-bottom rotate-[22deg] z-10 rounded-full" />
            <div className="w-6 h-6 bg-[#FF4545] rounded-full shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3),2px_2px_12px_rgba(255,69,69,0.2)] relative z-20" />
          </motion.div>
          <div className="w-24 h-16 bg-[#FFF9E6] rounded-[50%_50%_25%_25%] shadow-[inset_0_-8px_15px_rgba(0,0,0,0.06)] relative z-10" />
        </div>

        {/* 蜜瓜苏打按钮 */}
        <motion.button 
          onClick={() => setIsStarted(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-32 h-48 bg-[#70C1A1] rounded-[10%_10%_45%_45%] shadow-[0_30px_60px_-15px_rgba(112,193,161,0.6)] flex flex-col items-center justify-end pb-10 overflow-hidden border-[4px] border-white/50"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              initial={{ y: 220, x: 0, opacity: 0 }}
              animate={{ y: -5, x: b.drift, opacity: [0, 0.85, 0], scale: [0.3, 1.2, 0.4] }}
              transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: "easeIn" }}
              className="absolute bg-white/60 rounded-full"
              style={{ left: b.left, width: b.size, height: b.size, filter: `blur(${b.blur})` }}
            />
          ))}
          <span className="relative z-10 text-white tracking-[0.6em] text-[16px] font-bold uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">Start</span>
        </motion.button>
        
        <p className="mt-12 text-[11px] text-[#A6998A] tracking-[0.2em] font-light text-center leading-relaxed">
          末班车、雨棚、自动门的嗡鸣。<br />
          测测你属于东京的哪个角落？
        </p>
      </div>
      <div className="mb-10 text-center uppercase tracking-[0.4em] text-[10px] text-[#C4B7A6]">By Fukuko</div>
    </main>
  );

  // --- 视图渲染：加载中 ---
  if (isLoading) return (
    <div className="fixed inset-0 bg-[#F9F6F2] flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-12">
        <div className="relative w-40 h-10 border-b border-[#D6CFC7] flex items-end justify-center overflow-hidden">
           <motion.div animate={{ x: [-100, 100] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="text-[#70C1A1]">
             <Train size={32} strokeWidth={1.2} />
           </motion.div>
        </div>
        <div className="space-y-3">
          <h2 className="text-[14px] tracking-[0.4em] text-[#C4B7A6] font-light uppercase">Analyzing...</h2>
          <p className="text-[20px] tracking-[0.2em] text-[#4A443F] font-extralight italic">东京人格读取中</p>
        </div>
        <p className="text-[12px] text-[#A6998A] tracking-[0.1em] font-light mt-10">{currentTip}</p>
      </div>
    </div>
  );

  // --- 视图渲染：结果页 ---
  if (isFinished) {
    const res = getFinalResult();
    return (
      <main className="min-h-screen bg-[#F9F6F2] flex flex-col items-center justify-center p-6 py-12">
        <motion.div 
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white w-full max-w-[360px] shadow-2xl relative border-t-[8px] border-[#70C1A1] print:shadow-none print:border-t-[15px]"
        >
          {res.isHidden ? (
            <div className="bg-[#4A443F] text-white px-6 py-4 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.2em] text-[#70C1A1]">TOKYO SUB-SIGNAL</span>
                <span className="text-[12px] font-light">东京隐藏状态已触发</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#70C1A1] animate-pulse" />
            </div>
          ) : (
            <div className="pt-8 pb-4 text-center border-b border-[#F9F9F9]">
              <span className="text-[10px] tracking-[0.4em] text-[#C4B7A6] uppercase">Identity Card</span>
            </div>
          )}
          
          <div className="p-8">
            {res.isHidden && <p className="text-[#70C1A1] text-[11px] mb-4 font-mono">&gt; {res.triggerText}</p>}
            <h1 className="text-[26px] font-light tracking-[0.2em] mb-8 text-[#333]">{res.title}</h1>
            <p className="text-[14px] leading-[1.9] text-[#666] font-light whitespace-pre-wrap mb-10 text-justify">
              {res.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {res.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] text-[#A6998A] border border-[#E5E0DA] px-2 py-1 rounded-sm">{tag}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-[#F0EDE9] pt-8">
               <div>
                 <p className="text-[9px] text-[#C4B7A6] mb-1 uppercase tracking-tighter">Matched Area</p>
                 <p className="text-[13px] text-[#444] font-medium">{res.area}</p>
               </div>
               <div>
                 <p className="text-[9px] text-[#C4B7A6] mb-1 uppercase tracking-tighter">Active Time</p>
                 <p className="text-[13px] text-[#444] font-medium">{res.time}</p>
               </div>
            </div>
            {/* 修改后的右下角：No.计数器 */}
            <div className="mt-10 pt-4 border-t border-dashed border-[#F0EDE9] flex justify-between items-center">
                <span className="text-[9px] text-[#D6CFC7] font-mono tracking-widest">VER. 2026.05</span>
                <span className="text-[9px] text-[#D6CFC7] font-mono font-bold tracking-wider">No. {String(testNumber).padStart(4, '0')}</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col gap-3 w-full max-w-[360px] print:hidden">
          <button 
            onClick={handleSaveCard}
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#70C1A1] text-white text-[13px] tracking-[0.2em] rounded-sm shadow-lg active:scale-95 transition-all font-medium"
          >
            <Download size={18} /> 保存我的东京人格卡片
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full py-4 bg-white/50 text-[#A6998A] text-[10px] tracking-[0.4em] uppercase border border-[#E5E0DA] hover:bg-white transition-colors"
          >
            Restart System
          </button>
        </div>

        <style jsx global>{`
          @media print {
            body { background: white !important; -webkit-print-color-adjust: exact; }
            .print\\:hidden { display: none !important; }
            main { padding: 0 !important; display: block !important; }
            .shadow-2xl { box-shadow: none !important; }
          }
        `}</style>
      </main>
    );
  }

  // --- 视图渲染：答题页 ---
  return (
    <main className="fixed inset-0 bg-[#F9F6F2] flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="bg-white w-full max-w-[420px] p-10 shadow-xl border-b-[10px] border-[#70C1A1] relative">
          {index > 0 && (
            <button onClick={handleBack} className="absolute top-6 left-6 flex items-center text-[10px] text-[#C4B7A6] hover:text-[#70C1A1] transition-colors uppercase tracking-[0.2em]">
              <ArrowLeft size={12} className="mr-1" /> Back
            </button>
          )}
          <div className="text-[10px] tracking-[0.5em] text-[#C4B7A6] mb-8 uppercase font-medium text-right pt-2">Progress {String(index + 1).padStart(2, '0')} / 21</div>
          <h2 className="text-[18px] leading-[1.8] font-light text-[#333] mb-12 tracking-wide">{questions[index].question}</h2>
          <div className="space-y-1">
            {questions[index].options.map((opt, i) => (
              <button key={i} onClick={() => handleSelect(opt)} className="w-full text-left py-4 border-b border-[#F9F9F9] text-[15px] text-[#666] hover:text-[#70C1A1] transition-all flex items-center group">
                <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                {opt.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}