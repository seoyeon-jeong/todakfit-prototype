// data.jsx — exercise database, routines, onboarding options.

// ── Exercise database (beginner-friendly, machine-focused) ──
const EXERCISES = {
  treadmill: {
    name: '트레드밀', en: 'Treadmill', target: '유산소 · 전신',
    tag: '유산소', tone: 'butter', emoji: '🏃',
    sets: '20분 걷기/조깅', rest: '속도는 편안하게',
    summary: '걷기부터 가볍게 뛰기까지. 첫 날은 빠르게 걷는 것만으로도 충분해요. 심폐 기능을 키우는 가장 친숙한 워밍업이에요.',
    steps: [
      '속도 4~5km/h 걷기로 5분 워밍업해요.',
      '이후 5~6km/h 빠르게 걷거나 가볍게 달려요.',
      '숨이 많이 찰 땐 속도를 줄이고 걷기로 돌아와도 괜찮아요.',
      '마지막 3분은 다시 천천히 걷으며 쿨다운해요.',
    ],
    tips: ['처음엔 뛰려 하지 말고, 숨이 약간 찰 정도로 빠르게 걷는 게 좋아요.', '20분이 힘들면 10분부터 시작해도 충분해요.'],
    yt: '트레드밀 초보 사용법',
  },
  bike: {
    name: '사이클', en: 'Stationary Bike', target: '유산소 · 하체',
    tag: '유산소', tone: 'butter', emoji: '🚴',
    sets: '15~20분', rest: '페달 속도 조절',
    summary: '자전거 페달을 밟으며 하체와 심폐를 동시에 단련해요. 무릎에 부담이 적어 초보자에게 특히 좋아요.',
    steps: [
      '안장 높이를 맞춰요. 페달 아래에서 무릎이 살짝 굽혀지는 높이가 딱 좋아요.',
      '저항 레벨은 가장 낮게 시작해요.',
      '분당 60~70rpm 속도로 편안하게 페달을 밟아요.',
      '10분 후 조금씩 속도나 저항을 올려볼 수 있어요.',
    ],
    tips: ['등은 곧게 펴고 손잡이를 너무 꽉 잡지 않아요.', '무릎이 안으로 모이지 않게 신경써요.'],
    yt: '헬스장 사이클 초보 사용법',
  },
  legpress: {
    name: '레그 프레스', en: 'Leg Press', target: '하체 · 허벅지/엉덩이',
    tag: '머신', tone: 'mint', emoji: '🦵',
    sets: '12회 × 3세트', rest: '세트 사이 60초 휴식',
    summary: '발판을 밀어내며 허벅지와 엉덩이를 키우는, 초보자가 가장 안전하게 시작하기 좋은 하체 운동이에요.',
    steps: [
      '등받이에 등을 완전히 기대고 앉아, 발은 어깨너비로 발판 가운데에 둬요.',
      '무릎이 발끝과 같은 방향을 보도록 정렬해요. (안쪽으로 모이지 않게!)',
      '숨을 내쉬며 발판을 천천히 밀어내요. 무릎은 끝까지 다 펴지 말고 살짝 남겨둬요.',
      '숨을 들이마시며 무릎이 90도가 될 때까지 천천히 돌아와요. 2초에 걸쳐 내려오기!',
    ],
    tips: ['허리가 시트에서 뜨면 무게가 무거운 거예요. 한 단계 낮춰요.', '무릎이 안쪽으로 모이지 않게 의식해요.'],
    yt: '레그프레스 정확한 자세 초보',
  },
  latpulldown: {
    name: '랫 풀다운', en: 'Lat Pulldown', target: '등 · 광배근',
    tag: '머신', tone: 'lav', emoji: '🪶',
    sets: '12회 × 3세트', rest: '세트 사이 60초 휴식',
    summary: '바를 가슴 쪽으로 당기며 넓고 탄탄한 등을 만들어요. 굽은 어깨를 펴주는 자세교정 효과도 커요.',
    steps: [
      '허벅지 패드를 다리에 맞게 고정하고, 바를 어깨보다 조금 넓게 잡아요.',
      '가슴을 살짝 들고 시선은 앞을 봐요. 상체는 아주 살짝만 뒤로.',
      '숨을 내쉬며 바를 쇄골(가슴 위쪽)까지 당겨요. 팔이 아니라 등으로 당긴다는 느낌!',
      '숨을 들이마시며 천천히 팔이 다 펴질 때까지 올려요.',
    ],
    tips: ['목 뒤로 바를 내리지 마세요. 꼭 가슴 앞쪽으로!', '반동을 쓰지 않고 천천히 당기는 게 핵심이에요.'],
    yt: '랫풀다운 등에 자극 주는 법',
  },
  chestpress: {
    name: '체스트 프레스', en: 'Chest Press', target: '가슴 · 어깨 앞',
    tag: '머신', tone: 'peach', emoji: '💪',
    sets: '12회 × 3세트', rest: '세트 사이 60초 휴식',
    summary: '손잡이를 앞으로 밀며 가슴 근육을 키워요. 자세가 고정돼 있어 초보자도 무서움 없이 할 수 있어요.',
    steps: [
      '손잡이가 가슴 중앙 높이에 오도록 시트를 조절해요.',
      '등과 어깨를 등받이에 붙이고, 손잡이를 가볍게 잡아요.',
      '숨을 내쉬며 팔꿈치가 다 펴지기 직전까지 앞으로 밀어요.',
      '숨을 들이마시며 가슴이 늘어나는 느낌까지 천천히 돌아와요.',
    ],
    tips: ['어깨가 으쓱 올라가지 않게 아래로 내린 상태를 유지해요.', '손목은 꺾이지 않게 일직선으로.'],
    yt: '체스트프레스 머신 초보 자세',
  },
  legcurl: {
    name: '레그 컬', en: 'Seated Leg Curl', target: '뒷벅지 · 햄스트링',
    tag: '머신', tone: 'mint', emoji: '🦿',
    sets: '12회 × 3세트', rest: '세트 사이 50초 휴식',
    summary: '발목 패드를 접으며 뒷벅지를 다듬어요. 레그 프레스와 짝꿍처럼 같이 하면 하체 균형이 좋아져요.',
    steps: [
      '무릎이 회전축과 일치하도록 시트를 맞추고, 패드를 발목 위에 둬요.',
      '허벅지 패드를 내려 다리를 고정해요.',
      '숨을 내쉬며 뒤꿈치를 엉덩이 쪽으로 끌어당기듯 접어요.',
      '숨을 들이마시며 천천히 시작 자세로 돌아와요.',
    ],
    tips: ['엉덩이가 시트에서 들리지 않게 해요.', '끝까지 접었을 때 1초 멈추면 자극이 배가 돼요.'],
    yt: '레그컬 머신 사용법',
  },
  seatedrow: {
    name: '시티드 로우', en: 'Seated Row', target: '등 · 가운데',
    tag: '머신', tone: 'lav', emoji: '🚣',
    sets: '12회 × 3세트', rest: '세트 사이 60초 휴식',
    summary: '손잡이를 몸쪽으로 당기며 등 가운데를 모아줘요. 자세교정과 라인 정리에 아주 좋아요.',
    steps: [
      '가슴 패드에 가슴을 가볍게 대고 앉아 손잡이를 잡아요.',
      '허리를 곧게 세우고 가슴은 살짝 들어요.',
      '숨을 내쉬며 팔꿈치를 뒤로 보내며 손잡이를 배꼽 쪽으로 당겨요.',
      '어깨뼈를 모은다는 느낌으로 1초 멈췄다가 천천히 돌아와요.',
    ],
    tips: ['어깨를 으쓱하지 말고, 팔꿈치를 뒤로 보낸다고 생각해요.', '상체를 과하게 흔들지 않아요.'],
    yt: '시티드로우 등 운동 자세',
  },
  goblet: {
    name: '고블릿 스쿼트', en: 'Goblet Squat', target: '하체 · 전신',
    tag: '덤벨', tone: 'peach', emoji: '🏋️‍♀️',
    sets: '10회 × 4세트', rest: '세트 사이 75초 휴식',
    summary: '덤벨을 가슴 앞에 안고 앉았다 일어나는, 한 단계 성장한 당신을 위한 자유중량 운동이에요.',
    steps: [
      '덤벨(또는 케틀벨) 한쪽을 두 손으로 받쳐 가슴 앞에 안아요.',
      '발은 어깨보다 살짝 넓게, 발끝은 살짝 바깥으로.',
      '숨을 들이마시며 엉덩이를 뒤로 빼며 허벅지가 바닥과 평행이 될 때까지 앉아요.',
      '숨을 내쉬며 발 전체로 바닥을 밀어 일어나요.',
    ],
    tips: ['무릎이 발끝을 살짝 넘어도 괜찮아요. 무릎이 안으로 모이는 게 더 위험해요.', '가벼운 무게로 자세부터 익혀요.'],
    yt: '고블릿 스쿼트 정확한 자세',
  },
  rdl: {
    name: '루마니안 데드리프트', en: 'Romanian Deadlift', target: '엉덩이 · 뒷벅지',
    tag: '덤벨', tone: 'lav', emoji: '🍑',
    sets: '10회 × 4세트', rest: '세트 사이 75초 휴식',
    summary: '엉덩이를 뒤로 접으며 힙업에 가장 효과적인 운동. 한 달차의 당신이라면 도전해볼 만해요!',
    steps: [
      '덤벨을 허벅지 앞에 들고, 발은 골반 너비로 서요.',
      '무릎을 살짝만 굽힌 채 고정하고, 엉덩이를 뒤로 쭉 밀어요.',
      '덤벨이 정강이 중간쯤 내려갈 때까지 상체를 숙여요. 등은 곧게!',
      '엉덩이를 조이며 상체를 세워 시작 자세로 돌아와요.',
    ],
    tips: ['허리를 굽히는 게 아니라 엉덩이를 뒤로 보내는 거예요.', '뒷벅지가 당기는 느낌이 정상이에요.'],
    yt: '루마니안 데드리프트 덤벨 초보',
  },
  shoulderpress: {
    name: '숄더 프레스', en: 'Shoulder Press', target: '어깨 · 팔',
    tag: '머신', tone: 'peach', emoji: '🙆‍♀️',
    sets: '12회 × 3세트', rest: '세트 사이 60초 휴식',
    summary: '손잡이를 머리 위로 밀어 올려 동그랗고 탄탄한 어깨 라인을 만들어요.',
    steps: [
      '손잡이가 어깨 높이에 오도록 시트를 맞춰요.',
      '등을 등받이에 붙이고 코어에 살짝 힘을 줘요.',
      '숨을 내쉬며 손잡이를 머리 위로 밀어 올려요. 팔꿈치는 끝까지 다 펴지 않아요.',
      '숨을 들이마시며 천천히 어깨 높이로 돌아와요.',
    ],
    tips: ['허리가 과하게 젖혀지지 않게 코어를 잡아요.', '무게보다 정확한 궤도가 먼저예요.'],
    yt: '숄더프레스 머신 어깨 운동',
  },
};

// ── Two routines, by experience version ──
const ROUTINES = {
  beginner: {
    version: 'beginner',
    day: 1,
    title: '첫 만남 · 유산소 + 기구 2종',
    duration: '약 30분',
    list: ['treadmill', 'legpress', 'latpulldown'],
  },
  month: {
    version: 'month',
    day: 32,
    title: '한 달차 · 근력 업그레이드 루틴',
    duration: '약 45분',
    list: ['goblet', 'latpulldown', 'chestpress', 'rdl', 'shoulderpress'],
  },
};

// ── Encouraging messages (clickable → opens chat) ──
const CHEER = {
  beginner: {
    line: '{name}님의 첫 시도를 응원해요!',
    sub: '오늘은 딱 한 동작만 따라와도 충분해요. 잘하려고 하지 않아도 돼요 — 시작한 것만으로 이미 멋져요 🌷',
    mood: 'cheer',
  },
  month: {
    line: '{name}님, 이제 근력에 도전할 때!',
    sub: '한 달 동안 정말 꾸준했어요. 유산소는 충분했으니, 오늘부터는 근육을 깨워볼까요? 몸이 달라지는 게 보일 거예요 💪',
    mood: 'wink',
  },
};

// ── Onboarding options ──
const GOAL_OPTIONS = [
  { id: 'diet', label: '다이어트', emoji: '🍃', tone: 'mint' },
  { id: 'strength', label: '근력 키우기', emoji: '💪', tone: 'peach' },
  { id: 'stamina', label: '체력 기르기', emoji: '⚡', tone: 'butter' },
  { id: 'posture', label: '자세 교정', emoji: '🧘‍♀️', tone: 'lav' },
];
const EXP_OPTIONS = [
  { id: 'beginner', label: '완전 처음이에요', sub: '운동이 낯설어요', emoji: '🌱' },
  { id: 'month', label: '한 달 정도 됐어요', sub: '유산소 위주로 했어요', emoji: '🌿' },
  { id: 'more', label: '그 이상이에요', sub: '근력 운동도 해봤어요', emoji: '🌳' },
];
const FREQ_OPTIONS = [
  { id: 'f12', label: '주 1–2회', emoji: '🗓️' },
  { id: 'f34', label: '주 3–4회', emoji: '📅' },
  { id: 'f5', label: '주 5회 이상', emoji: '🔥' },
];
const AREA_OPTIONS = [
  { id: 'lower', label: '하체', emoji: '🦵', tone: 'mint' },
  { id: 'core', label: '복부', emoji: '🎯', tone: 'peach' },
  { id: 'arm', label: '팔', emoji: '💪', tone: 'butter' },
  { id: 'back', label: '등', emoji: '🪶', tone: 'lav' },
  { id: 'hip', label: '엉덩이', emoji: '🍑', tone: 'peach' },
  { id: 'full', label: '전신', emoji: '✨', tone: 'mint' },
];

Object.assign(window, {
  EXERCISES, ROUTINES, CHEER,
  GOAL_OPTIONS, EXP_OPTIONS, FREQ_OPTIONS, AREA_OPTIONS,
});
