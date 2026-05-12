// src/data/questions.ts

export interface QuestionOption {
  text: string;
  types: string[]; 
  hiddenTypes?: string[]; 
}

export interface Question {
  id: number;
  question: string; // 这里必须叫 question，和下面的数据对齐
  options: QuestionOption[];
}

export const mainTypes = [
  "新宿高压运行型", "涩谷持续加载中型", "东京站转运人生型", "自由之丘散步日型",
  "清澄白河晨雾型", "藏前留白感型", "下北泽逃亡计划型", "吉祥寺奶油云朵型",
  "东京塔信号弱型", "原宿透明感上瘾型", "品川低电量续航型", "池袋补给站型",
];

export const hiddenTypes = [
  "凌晨两点便利店人格", "末班电车错过型", "山手线反方向人格",
];

export const questions: Question[] = [
  {
    id: 1,
    question: "东京下雨了，你更想？",
    options: [
      { text: "去便利店买杯热咖啡继续赶路", types: ["新宿高压运行型", "品川低电量续航型"] },
      { text: "临时躲进咖啡店坐到雨停", types: ["清澄白河晨雾型", "藏前留白感型"] },
      { text: "钻进地下商场顺便乱逛", types: ["东京站转运人生型", "池袋补给站型"] },
      { text: "撑伞继续在雨里慢慢走", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
    ],
  },
  {
    id: 2,
    question: "错过末班电车以后，你第一反应是？",
    options: [
      { text: "开始查别的回酒店路线", types: ["东京站转运人生型"] },
      { text: "去便利店买点东西等第一班车", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "干脆慢慢散步回去", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
      { text: "那就继续下一场", types: ["涩谷持续加载中型", "新宿高压运行型"] },
    ],
  },
  {
    id: 3,
    question: "第一次到东京，你最想先感受的是？",
    options: [
      { text: "巨大商圈的人流和霓虹", types: ["涩谷持续加载中型", "新宿高压运行型"] },
      { text: "安静住宅街的生活感", types: ["吉祥寺奶油云朵型"] },
      { text: "河边和旧街道的空气", types: ["藏前留白感型", "清澄白河晨雾型"] },
      { text: "夜晚电车穿过城市的感觉", types: ["东京塔信号弱型"] },
    ],
  },
  {
    id: 4,
    question: "东京旅行时，你最容易在哪停下脚步？",
    options: [
      { text: "大型百货商场", types: ["涩谷持续加载中型"] },
      { text: "热门展望台或打卡景点", types: ["原宿透明感上瘾型"] },
      { text: "24小时便利店", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "没什么人的小巷子", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
    ],
  },
  {
    id: 5,
    question: "东京凌晨一点时，你通常会？",
    options: [
      { text: "继续逛Donki", types: ["新宿高压运行型"] },
      { text: "坐在便利店吃关东煮", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "沿着河边慢慢散步", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
      { text: "回酒店休息准备明天行程", types: ["东京站转运人生型", "吉祥寺奶油云朵型"] },
    ],
  },
  {
    id: 6,
    question: "你更喜欢哪种旅行节奏？",
    options: [
      { text: "一天排满所有想去的地方", types: ["新宿高压运行型", "涩谷持续加载中型"] },
      { text: "一天只认真逛一个区域", types: ["吉祥寺奶油云朵型", "清澄白河晨雾型"] },
      { text: "走到哪算哪，随时改计划", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
      { text: "按提前查好的路线慢慢走", types: ["东京站转运人生型"] },
    ],
  },
  {
    id: 7,
    question: "一个人在东京吃晚饭时，你更可能？",
    options: [
      { text: "快速解决继续赶路", types: ["品川低电量续航型"] },
      { text: "找一家小店慢慢坐着", types: ["吉祥寺奶油云朵型"] },
      { text: "边吃边看窗外夜景", types: ["东京塔信号弱型"] },
      { text: "临时改去居酒屋喝一杯", types: ["下北泽逃亡计划型"] },
    ],
  },
  {
    id: 8,
    question: "你理想中的东京住宿附近应该有？",
    options: [
      { text: "大型换乘车站", types: ["东京站转运人生型"] },
      { text: "咖啡店和杂货店", types: ["自由之丘散步日型", "清澄白河晨雾型"] },
      { text: "24小时营业便利店", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "livehouse和小酒吧", types: ["下北泽逃亡计划型"] },
    ],
  },
  {
    id: 9,
    question: "旅行预算快超支时，你会？",
    options: [
      { text: "继续买，回去再说", types: ["原宿透明感上瘾型", "涩谷持续加载中型"] },
      { text: "认真开始记账", types: ["池袋补给站型"] },
      { text: "少吃点也想住好酒店", types: ["自由之丘散步日型"] },
      { text: "突然什么都不想买了", types: ["清澄白河晨雾型"] },
    ],
  },
  {
    id: 10,
    question: "你会为了什么绕远路？",
    options: [
      { text: "一家想去很久的店", types: ["自由之丘散步日型"] },
      { text: "路过的河边夜景", types: ["东京塔信号弱型", "藏前留白感型"] },
      { text: "突然看到的路边小店", types: ["下北泽逃亡计划型"] },
      { text: "其实根本不想绕路", types: ["东京站转运人生型"] },
    ],
  },
  {
    id: 11,
    question: "东京旅行里，你最怕？",
    options: [
      { text: "浪费时间", types: ["新宿高压运行型"] },
      { text: "店铺提前关门", types: ["原宿透明感上瘾型"] },
      { text: "行程太满没法发呆", types: ["清澄白河晨雾型"] },
      { text: "错过深夜的城市气氛", types: ["东京塔信号弱型"] },
    ],
  },
  {
    id: 12,
    question: "你最喜欢东京哪种街道？",
    options: [
      { text: "满是广告牌的大街", types: ["涩谷持续加载中型"] },
      { text: "安静的住宅区小路", types: ["吉祥寺奶油云朵型"] },
      { text: "河边和桥附近", types: ["藏前留白感型"] },
      { text: "深夜还有人的商业街", types: ["新宿高压运行型"] },
    ],
  },
  {
    id: 13,
    question: "东京旅行时，你的相册里最多的是？",
    options: [
      { text: "夜景和霓虹", types: ["东京塔信号弱型"] },
      { text: "咖啡店和美食", types: ["自由之丘散步日型"] },
      { text: "电车和街道", types: ["品川低电量续航型"] },
      { text: "朋友和热闹场面", types: ["涩谷持续加载中型"] },
    ],
  },
  {
    id: 14,
    question: "如果突然空出半天时间，你会？",
    options: [
      { text: "继续塞更多景点", types: ["新宿高压运行型"] },
      { text: "找个地方坐一下午", types: ["清澄白河晨雾型"] },
      { text: "随机坐电车出去", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
      { text: "睡一觉恢复体力", types: ["池袋补给站型"] },
    ],
  },
  {
    id: 15,
    question: "在东京迷路的时候，你通常会？",
    options: [
      { text: "立刻打开地图重新规划", types: ["东京站转运人生型"] },
      { text: "随便拐进附近的小路", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
      { text: "先找家店坐下休息", types: ["吉祥寺奶油云朵型"] },
      { text: "继续沿着现在这条路走", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
    ],
  },
  {
    id: 16,
    question: "东京旅行时，你最依赖什么？",
    options: [
      { text: "提前查好的路线", types: ["东京站转运人生型"] },
      { text: "当天突然出现的心情", types: ["下北泽逃亡计划型"] },
      { text: "体力和便利店咖啡", types: ["品川低电量续航型"] },
      { text: "同行人的临时提议", types: ["涩谷持续加载中型"] },
    ],
  },
  {
    id: 17,
    question: "东京电车里，你通常会？",
    options: [
      { text: "一直盯着换乘路线", types: ["东京站转运人生型", "品川低电量续航型"] },
      { text: "戴着耳机看窗外发呆", types: ["清澄白河晨雾型"] },
      { text: "偷偷观察别人穿搭", types: ["原宿透明感上瘾型"] },
      { text: "坐下以后直接开始补觉", types: ["池袋补给站型"] },
    ],
  },
  {
    id: 18,
    question: "在东京便利店里，你最容易多买什么？",
    options: [
      { text: "热咖啡和功能饮料", types: ["品川低电量续航型"] },
      { text: "限定甜品和小零食", types: ["原宿透明感上瘾型", "自由之丘散步日型"] },
      { text: "饭团和关东煮", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
      { text: "其实只是进去吹空调", types: ["藏前留白感型"] },
    ],
  },
  {
    id: 19,
    question: "东京晴天时，你更想去哪？",
    options: [
      { text: "继续冲热门商圈", types: ["涩谷持续加载中型"] },
      { text: "去公园或河边坐着", types: ["清澄白河晨雾型", "藏前留白感型"] },
      { text: "随便找条街慢慢乱走", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格"] },
      { text: "找家甜品店休息一下", types: ["自由之丘散步日型"] },
    ],
  },
  {
    id: 20,
    question: "旅行结束前最后一晚，你通常会？",
    options: [
      { text: "疯狂补买伴手礼", types: ["原宿透明感上瘾型"] },
      { text: "回熟悉的小店看看", types: ["吉祥寺奶油云朵型"] },
      { text: "找个地方安静待一会", types: ["清澄白河晨雾型"] },
      { text: "继续在东京夜里乱走", types: ["东京塔信号弱型"], hiddenTypes: ["末班电车错过型"] },
    ],
  },
  {
    id: 21,
    question: "离开东京前的最后几个小时，你更想？",
    options: [
      { text: "再冲几个没去成的地方", types: ["涩谷持续加载中型", "新宿高压运行型"] },
      { text: "找家咖啡店慢慢坐着", types: ["清澄白河晨雾型", "吉祥寺奶油云朵型"] },
      { text: "继续在街上随便乱走", types: ["下北泽逃亡计划型"], hiddenTypes: ["山手线反方向人格", "末班电车错过型"] },
      { text: "回便利店买最后一次宵夜", types: ["池袋补给站型"], hiddenTypes: ["凌晨两点便利店人格"] },
    ],
  },
];