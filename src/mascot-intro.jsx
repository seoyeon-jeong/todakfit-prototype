// mascot-intro.jsx — 토닥이 AI 치어리더 소개 화면 (온보딩 직후, 홈 이전)

// ── 친구 동물들 (3번째 슬라이드) ──

function FriendBunny({ size = 58 }) {
  const h = size * 1.7;
  const fur = '#F5E6EB', furD = '#EDD5DC', inEar = '#FFC2D0';
  const eye = '#3A3550', cheek = '#FFAAC0', nose = '#FFB6C1';
  return (
    <svg width={size} height={h} viewBox="0 0 100 170" aria-label="토끼 친구">
      {/* ears - behind head */}
      <ellipse cx="34" cy="30" rx="11" ry="30" fill={fur} transform="rotate(-10 34 30)" />
      <ellipse cx="34" cy="30" rx="5.5" ry="23" fill={inEar} transform="rotate(-10 34 30)" />
      <ellipse cx="66" cy="30" rx="11" ry="30" fill={fur} transform="rotate(10 66 30)" />
      <ellipse cx="66" cy="30" rx="5.5" ry="23" fill={inEar} transform="rotate(10 66 30)" />
      {/* body */}
      <ellipse cx="50" cy="130" rx="26" ry="32" fill={fur} />
      <ellipse cx="50" cy="136" rx="16" ry="22" fill={furD} />
      {/* arms */}
      <ellipse cx="18" cy="122" rx="9" ry="19" fill={fur} transform="rotate(18 18 122)" />
      <ellipse cx="82" cy="118" rx="9" ry="19" fill={fur} transform="rotate(-22 82 118)" />
      {/* big bunny feet */}
      <ellipse cx="34" cy="160" rx="19" ry="9" fill={furD} />
      <ellipse cx="66" cy="160" rx="19" ry="9" fill={furD} />
      {/* head */}
      <ellipse cx="50" cy="72" rx="32" ry="30" fill={fur} />
      <ellipse cx="50" cy="83" rx="16" ry="12" fill={furD} />
      {/* cheeks */}
      <ellipse cx="26" cy="77" rx="8" ry="6" fill={cheek} opacity="0.75" />
      <ellipse cx="74" cy="77" rx="8" ry="6" fill={cheek} opacity="0.75" />
      {/* eyes */}
      <ellipse cx="37" cy="67" rx="5" ry="5.5" fill={eye} />
      <circle cx="39" cy="65" r="1.8" fill="#fff" />
      <ellipse cx="63" cy="67" rx="5" ry="5.5" fill={eye} />
      <circle cx="65" cy="65" r="1.8" fill="#fff" />
      {/* nose */}
      <ellipse cx="50" cy="79" rx="4.5" ry="3.5" fill={nose} />
      {/* smile */}
      <path d="M43 87 q7 6 14 0" stroke="#5A4636" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FriendCat({ size = 56 }) {
  const h = size * 1.6;
  const fur = '#F5C18A', furD = '#E8A870', inEar = '#FFC2D0';
  const eye = '#3A3550', cheek = '#FFAAC0';
  return (
    <svg width={size} height={h} viewBox="0 0 100 160" aria-label="고양이 친구">
      {/* tail - behind body */}
      <path d="M70 155 Q96 138 90 108 Q87 94 78 98" stroke={fur} strokeWidth="11" fill="none" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="50" cy="122" rx="27" ry="30" fill={fur} />
      <ellipse cx="50" cy="128" rx="17" ry="20" fill={furD} />
      {/* arms */}
      <ellipse cx="17" cy="116" rx="9" ry="18" fill={fur} transform="rotate(15 17 116)" />
      <ellipse cx="83" cy="116" rx="9" ry="18" fill={fur} transform="rotate(-15 83 116)" />
      {/* feet */}
      <ellipse cx="36" cy="150" rx="16" ry="8" fill={furD} />
      <ellipse cx="64" cy="150" rx="16" ry="8" fill={furD} />
      {/* ears - triangle */}
      <polygon points="22,50 10,14 42,42" fill={fur} />
      <polygon points="26,49 18,22 38,41" fill={inEar} />
      <polygon points="78,50 90,14 58,42" fill={fur} />
      <polygon points="74,49 82,22 62,41" fill={inEar} />
      {/* head */}
      <ellipse cx="50" cy="64" rx="34" ry="32" fill={fur} />
      <ellipse cx="50" cy="76" rx="20" ry="15" fill={furD} />
      {/* cheeks */}
      <ellipse cx="22" cy="71" rx="10" ry="7" fill={cheek} opacity="0.7" />
      <ellipse cx="78" cy="71" rx="10" ry="7" fill={cheek} opacity="0.7" />
      {/* eyes - happy squint */}
      <path d="M30 57 q9-7 14 0" stroke={eye} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M56 57 q9-7 14 0" stroke={eye} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* whiskers */}
      <line x1="5"  y1="70" x2="29" y2="72" stroke="#5A4636" strokeWidth="1.1" opacity="0.4" />
      <line x1="5"  y1="76" x2="29" y2="76" stroke="#5A4636" strokeWidth="1.1" opacity="0.4" />
      <line x1="71" y1="72" x2="95" y2="70" stroke="#5A4636" strokeWidth="1.1" opacity="0.4" />
      <line x1="71" y1="76" x2="95" y2="76" stroke="#5A4636" strokeWidth="1.1" opacity="0.4" />
      {/* nose */}
      <ellipse cx="50" cy="72" rx="5" ry="4" fill="#FF8FA3" />
      {/* smile */}
      <path d="M42 81 q8 7 16 0" stroke="#5A4636" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FriendBear({ size = 60 }) {
  const h = size * 1.6;
  const fur = '#C9956A', furD = '#DBA878', furL = '#D4A574';
  const eye = '#3A3550', cheek = '#FFAAC0';
  return (
    <svg width={size} height={h} viewBox="0 0 100 160" aria-label="곰 친구">
      {/* body */}
      <ellipse cx="50" cy="122" rx="30" ry="34" fill={fur} />
      <ellipse cx="50" cy="130" rx="19" ry="23" fill={furD} />
      {/* arms */}
      <ellipse cx="14" cy="114" rx="10" ry="20" fill={fur} transform="rotate(16 14 114)" />
      <ellipse cx="86" cy="114" rx="10" ry="20" fill={fur} transform="rotate(-16 86 114)" />
      {/* feet */}
      <ellipse cx="35" cy="152" rx="17" ry="9" fill={furD} />
      <ellipse cx="65" cy="152" rx="17" ry="9" fill={furD} />
      {/* ears */}
      <circle cx="22" cy="20" r="17" fill={fur} />
      <circle cx="22" cy="20" r="10" fill={furL} />
      <circle cx="78" cy="20" r="17" fill={fur} />
      <circle cx="78" cy="20" r="10" fill={furL} />
      {/* head */}
      <ellipse cx="50" cy="64" rx="37" ry="36" fill={fur} />
      <ellipse cx="50" cy="77" rx="22" ry="17" fill={furD} />
      {/* cheeks */}
      <ellipse cx="20" cy="71" rx="11" ry="8" fill={cheek} opacity="0.7" />
      <ellipse cx="80" cy="71" rx="11" ry="8" fill={cheek} opacity="0.7" />
      {/* eyes */}
      <ellipse cx="36" cy="57" rx="6.5" ry="7" fill={eye} />
      <circle cx="38" cy="55" r="2.2" fill="#fff" />
      <ellipse cx="64" cy="57" rx="6.5" ry="7" fill={eye} />
      <circle cx="66" cy="55" r="2.2" fill="#fff" />
      {/* nose */}
      <ellipse cx="50" cy="73" rx="7.5" ry="5.5" fill="#5A4636" />
      <ellipse cx="48" cy="71.5" rx="2.2" ry="1.6" fill="#fff" opacity="0.4" />
      {/* smile */}
      <path d="M40 83 q10 9 20 0" stroke="#5A4636" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FriendChick({ size = 52 }) {
  const h = size * 1.6;
  const fur = '#FFE066', furD = '#F5C800', furL = '#FFF3A8';
  const eye = '#3A3550', cheek = '#FFAAC0';
  return (
    <svg width={size} height={h} viewBox="0 0 100 160" aria-label="병아리 친구">
      {/* head tuft */}
      <ellipse cx="50" cy="7"  rx="6" ry="13" fill={furD} transform="rotate(-8 50 7)" />
      <ellipse cx="62" cy="5"  rx="5" ry="10" fill={furD} transform="rotate(14 62 5)" />
      <ellipse cx="38" cy="5"  rx="5" ry="10" fill={furD} transform="rotate(-14 38 5)" />
      {/* body */}
      <ellipse cx="50" cy="120" rx="29" ry="33" fill={fur} />
      <ellipse cx="50" cy="128" rx="19" ry="23" fill={furL} />
      {/* wings */}
      <ellipse cx="14" cy="116" rx="10" ry="20" fill={furD} transform="rotate(22 14 116)" />
      <ellipse cx="86" cy="116" rx="10" ry="20" fill={furD} transform="rotate(-22 86 116)" />
      {/* feet */}
      <line x1="38" y1="150" x2="26" y2="158" stroke="#FF9A3C" strokeWidth="4" strokeLinecap="round" />
      <line x1="38" y1="150" x2="37" y2="159" stroke="#FF9A3C" strokeWidth="4" strokeLinecap="round" />
      <line x1="38" y1="150" x2="48" y2="158" stroke="#FF9A3C" strokeWidth="4" strokeLinecap="round" />
      <line x1="62" y1="150" x2="52" y2="158" stroke="#FF9A3C" strokeWidth="4" strokeLinecap="round" />
      <line x1="62" y1="150" x2="63" y2="159" stroke="#FF9A3C" strokeWidth="4" strokeLinecap="round" />
      <line x1="62" y1="150" x2="74" y2="158" stroke="#FF9A3C" strokeWidth="4" strokeLinecap="round" />
      {/* head */}
      <ellipse cx="50" cy="58" rx="36" ry="34" fill={fur} />
      {/* cheeks */}
      <ellipse cx="22" cy="64" rx="10" ry="7" fill={cheek} opacity="0.7" />
      <ellipse cx="78" cy="64" rx="10" ry="7" fill={cheek} opacity="0.7" />
      {/* eyes */}
      <ellipse cx="36" cy="52" rx="6" ry="6.5" fill={eye} />
      <circle cx="38" cy="50" r="2" fill="#fff" />
      <ellipse cx="64" cy="52" rx="6" ry="6.5" fill={eye} />
      <circle cx="66" cy="50" r="2" fill="#fff" />
      {/* beak */}
      <polygon points="50,65 42,73 58,73" fill="#FF9A3C" />
      {/* smile */}
      <path d="M39 79 q11 8 22 0" stroke="#C99500" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 3번째 슬라이드 친구 그룹
function FriendGroup() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ transform: 'rotate(7deg)', transformOrigin: 'bottom center', marginRight: -10 }}>
        <FriendBunny size={50} />
      </div>
      <div style={{ transform: 'rotate(3deg)', transformOrigin: 'bottom center', marginRight: -6 }}>
        <FriendCat size={48} />
      </div>
      <div style={{ marginLeft: -12, marginRight: -12 }}>
        <Mascot size={112} mood="happy" />
      </div>
      <div style={{ transform: 'rotate(-3deg)', transformOrigin: 'bottom center', marginLeft: -6 }}>
        <FriendBear size={52} />
      </div>
      <div style={{ transform: 'rotate(-7deg)', transformOrigin: 'bottom center', marginLeft: -10 }}>
        <FriendChick size={44} />
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ──

function MascotIntro({ name, onContinue }) {
  const [step, setStep] = React.useState(0);

  const slides = [
    {
      mood: 'wave',
      title: `${name}님, 안녕하세요!`,
      body: '저는 토닥이에요 🦘\n헬스장 첫 날부터 옆에서\n함께 응원할게요!',
      btn: '다음',
    },
    {
      mood: 'cheer',
      title: 'AI 치어리더예요!',
      body: '운동 자세, 루틴, 영양까지\n뭐든지 물어보세요 💪\nAI가 바로 맞춤 조언을 드려요.',
      btn: '다음',
    },
    {
      mood: 'happy',
      title: '헬린이끼리 함께해요',
      body: '비슷한 초보자 친구들과\n운동 인증하고 서로 응원하는\n따뜻한 커뮤니티도 있어요 🌷',
      btn: '시작하기!',
    },
  ];

  const s = slides[step];
  const isLast = step === slides.length - 1;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', background: 'var(--bg)', position: 'relative',
    }}>
      {/* progress dots */}
      <div style={{ display: 'flex', gap: 7, paddingTop: 64, flexShrink: 0 }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 24 : 8, height: 8, borderRadius: 99,
            background: i === step ? 'var(--accent)' : '#E8DFF0',
            transition: 'all .35s cubic-bezier(.2,.8,.2,1)',
          }} />
        ))}
      </div>

      {/* 마스코트 + 텍스트 그룹: 함께 세로 중앙 배치 */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', width: '100%',
      }}>
        <div key={`mascot-${step}`} className="tf-pop" style={{ marginBottom: 20 }}>
          {step === 2
            ? <FriendGroup />
            : <Mascot size={190} mood={s.mood} float={step === 1} />
          }
        </div>

        {/* text */}
        <div key={`text-${step}`} className="tf-rise" style={{
          padding: '0 36px', textAlign: 'center',
        }}>
          <div className="jua" style={{ fontSize: 26, color: 'var(--ink)', marginBottom: 14, lineHeight: 1.3 }}>
            {s.title}
          </div>
          <div style={{ fontSize: 16, color: '#7C7689', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
            {s.body}
          </div>
        </div>

        {/* feature chips (middle slide only) */}
        {step === 1 && (
          <div key="chips" className="tf-rise" style={{
            display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
            padding: '16px 24px 0',
          }}>
            {['심리 응원', '운동 자세 교정', '루틴 추천', '영양 조언'].map((label) => (
              <span key={label} style={{
                padding: '7px 14px', borderRadius: 99, fontSize: 13, fontWeight: 700,
                background: 'var(--accent-bg)', color: 'var(--accent-deep)',
              }}>{label}</span>
            ))}
          </div>
        )}
      </div>

      {/* button */}
      <div style={{ padding: '0 22px 48px', width: '100%', flexShrink: 0 }}>
        {!isLast && (
          <button onClick={onContinue} style={{
            display: 'block', margin: '0 auto 14px',
            fontSize: 13, color: '#C0BAC8', fontWeight: 700,
          }}>건너뛰기</button>
        )}
        <PrimaryButton onClick={() => isLast ? onContinue() : setStep(step + 1)}>
          {s.btn}
        </PrimaryButton>
      </div>
    </div>
  );
}

window.MascotIntro = MascotIntro;
