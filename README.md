# 토닥핏 (TodakFit)

헬스 입문 여성을 위한 AI 응원 피트니스 앱 프로토타입입니다.

운동이 처음인 사람도 부담 없이 시작할 수 있도록, 맞춤 운동 루틴과 AI 치어리더 **토닥이**가 함께합니다.

---

## 주요 기능

- **온보딩** — 이름, 운동 목표, 경력, 빈도, 관심 부위를 입력하면 맞춤 루틴을 생성해요
- **홈 화면** — 오늘의 운동 루틴 카드 (초보자 / 한 달 차 두 가지 버전)
- **운동 상세** — 단계별 자세 설명, 주의사항, 세트·휴식 정보
- **AI 채팅 (토닥이)** — Google Gemini 기반 AI 치어리더. 운동 자세, 식단, 동기부여 질문에 친절하게 답해줘요

## 기술 스택

- React 18 (CDN), Babel Standalone — 빌드 툴 없이 브라우저에서 직접 실행
- Google Gemini API (`gemini-1.5-flash`)
- 순수 HTML / JSX / CSS-in-JS

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/seoyeon-jeong/todakfit-prototype.git
cd todakfit-prototype
```

### 2. 실행

별도 서버 없이 `index.html`을 브라우저에서 바로 열면 됩니다.

```
index.html 파일을 더블클릭하거나 브라우저로 드래그
```

또는 VS Code의 Live Server 익스텐션을 사용하면 편리해요.

> AI 채팅(토닥이)은 별도 설정 없이 바로 사용 가능해요.

### 로컬 개발 시 API 키 교체

기본 키 대신 본인 키를 사용하려면 프로젝트 루트에 `config.js`를 생성하세요. (`.gitignore`에 등록되어 있어 git에 올라가지 않아요.)

```js
// config.js — Google AI Studio (https://aistudio.google.com/apikey) 에서 발급
window.TODAKFIT_API_KEY = 'AIzaSy...여기에_키_입력...';
```

## 프로젝트 구조

```
todakfit-prototype/
├── index.html          # 앱 진입점, Gemini API 호출 로직
├── config.js           # 로컬 개발용 API 키 (gitignore, 직접 생성 필요)
├── src/
│   ├── app.jsx         # 라우팅, 전역 상태, Tweaks 패널
│   ├── onboarding.jsx  # 온보딩 플로우
│   ├── home.jsx        # 홈 화면 (루틴 목록)
│   ├── detail.jsx      # 운동 상세 페이지
│   ├── chat.jsx        # AI 채팅 (토닥이)
│   ├── data.jsx        # 운동 DB, 루틴 데이터
│   ├── ui.jsx          # 공통 UI 컴포넌트
│   └── mascot.jsx      # 토닥이 마스코트 SVG
└── frames/
    ├── ios-frame.jsx   # iOS 디바이스 프레임
    └── tweaks-panel.jsx # 디자인 커스터마이징 패널
```

## 디자인 커스터마이징

브라우저 화면 우측 하단 **⚙️ 버튼**을 클릭하면 포인트 컬러, 배경 톤, 폰트 스타일을 실시간으로 변경할 수 있어요.
