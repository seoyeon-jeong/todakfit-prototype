// onboarding.jsx — multi-step intake before the home screen.

function Onboarding({ onComplete }) {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [goals, setGoals] = React.useState([]);
  const [exp, setExp] = React.useState(null);
  const [freq, setFreq] = React.useState(null);
  const [areas, setAreas] = React.useState([]);
  const [building, setBuilding] = React.useState(false);

  const TOTAL = 5;
  const toggle = (arr, set, id) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  const canNext = () => {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return goals.length > 0;
    if (step === 2) return !!exp;
    if (step === 3) return !!freq;
    if (step === 4) return areas.length > 0;
    return false;
  };

  const next = () => {
    if (step < TOTAL - 1) { setStep(step + 1); return; }
    // finish → show building, then complete
    setBuilding(true);
    setTimeout(() => onComplete({ name: name.trim(), goals, exp, freq, areas }), 2400);
  };

  const headers = [
    { mood: 'wave', big: '만나서 반가워요!', sub: '제가 뭐라고 부르면 될까요?' },
    { mood: 'happy', big: '어떤 목표가 있나요?', sub: '여러 개 골라도 좋아요' },
    { mood: 'think', big: '운동, 얼마나 해보셨어요?', sub: '솔직하게 골라주세요 — 맞춤 강도를 정할게요' },
    { mood: 'happy', big: '일주일에 몇 번 정도?', sub: '무리하지 않을 만큼이 딱 좋아요' },
    { mood: 'cheer', big: '어디에 집중할까요?', sub: '관심 있는 부위를 골라주세요' },
  ];
  const h = headers[step];

  if (building) return <BuildingPlan name={name.trim()} />;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* top: progress + back */}
      <div style={{ padding: '60px 22px 4px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 28 }}>
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} style={{ color: 'var(--ink)', marginLeft: -6 }}>
              <Icon name="back" size={26} />
            </button>
          ) : <div style={{ width: 26 }} />}
          <div style={{ flex: 1, height: 8, background: '#EFE7F0', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              width: `${((step + 1) / TOTAL) * 100}%`, height: '100%',
              background: 'linear-gradient(90deg, var(--accent), var(--accent-deep))',
              borderRadius: 99, transition: 'width .4s cubic-bezier(.2,.8,.2,1)',
            }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#B7B1C0', width: 30, textAlign: 'right' }}>{step + 1}/{TOTAL}</span>
        </div>
      </div>

      {/* scroll body */}
      <div className="tf-scroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 22px 8px' }}>
        <div key={step} className="tf-rise" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* mascot + headline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <Mascot size={68} mood={h.mood} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="jua" style={{ fontSize: 21, color: 'var(--ink)', lineHeight: 1.3 }}>{h.big}</div>
              <div style={{ fontSize: 13.5, color: '#9A94A4', marginTop: 4 }}>{h.sub}</div>
            </div>
          </div>

          {/* step content */}
          {step === 0 && (
            <div style={{ marginTop: 6 }}>
              <input
                autoFocus value={name} maxLength={10}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && canNext()) next(); }}
                placeholder="닉네임 또는 이름"
                style={{
                  width: '100%', padding: '18px 20px', borderRadius: 18,
                  border: '2px solid #F0E7F1', background: '#fff', fontSize: 19,
                  fontFamily: "'Jua', sans-serif", color: 'var(--ink)', outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = '#F0E7F1'}
              />
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {GOAL_OPTIONS.map((o) => (
                <GridCard key={o.id} {...o} selected={goals.includes(o.id)} onClick={() => toggle(goals, setGoals, o.id)} />
              ))}
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {EXP_OPTIONS.map((o) => (
                <RowCard key={o.id} {...o} selected={exp === o.id} onClick={() => setExp(o.id)} />
              ))}
              {exp && (
                <div className="tf-rise" style={{
                  fontSize: 13, color: 'var(--accent-deep)', background: 'var(--accent-bg)',
                  padding: '12px 14px', borderRadius: 14, marginTop: 2, lineHeight: 1.55,
                }}>
                  {exp === 'beginner' && '🌱 부담은 내려놓고, 가장 안전한 머신 위주로 함께해요.'}
                  {exp === 'month' && '🌿 좋아요! 이제 유산소를 넘어 근력 운동을 시작할 때예요.'}
                  {exp === 'more' && '🌳 멋져요! 자유중량을 섞은 루틴으로 한 단계 올려볼게요.'}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FREQ_OPTIONS.map((o) => (
                <RowCard key={o.id} {...o} selected={freq === o.id} onClick={() => setFreq(o.id)} />
              ))}
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {AREA_OPTIONS.map((o) => (
                <Chip key={o.id} label={o.label} emoji={o.emoji} tone={o.tone} big
                  selected={areas.includes(o.id)} onClick={() => toggle(areas, setAreas, o.id)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* footer button */}
      <div style={{ padding: '10px 22px 30px', flexShrink: 0, background: 'var(--bg)' }}>
        <PrimaryButton onClick={next} disabled={!canNext()}>
          {step === TOTAL - 1 ? '내 루틴 만들기 ✨' : '다음'}
        </PrimaryButton>
      </div>
    </div>
  );
}

// goal grid card
function GridCard({ label, emoji, tone, selected, onClick }) {
  const t = TONES[tone];
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
      padding: '18px 16px', borderRadius: 22, textAlign: 'left',
      background: selected ? t.bg : '#fff',
      border: `2px solid ${selected ? t.solid : '#F0ECF2'}`,
      boxShadow: selected ? `0 8px 20px ${t.solid}44` : '0 2px 8px rgba(0,0,0,0.03)',
      transition: 'all .18s', position: 'relative',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14, fontSize: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: selected ? '#fff' : t.bg,
      }}>{emoji}</div>
      <span style={{ fontSize: 16, fontWeight: 800, color: selected ? t.fg : 'var(--ink)' }}>{label}</span>
      {selected && (
        <div style={{ position: 'absolute', top: 12, right: 12, color: t.fg }}>
          <Icon name="check" size={20} stroke={3} />
        </div>
      )}
    </button>
  );
}

// experience / frequency row card
function RowCard({ label, sub, emoji, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14, width: '100%',
      padding: '16px 18px', borderRadius: 20, textAlign: 'left',
      background: selected ? 'var(--accent-bg)' : '#fff',
      border: `2px solid ${selected ? 'var(--accent)' : '#F0ECF2'}`,
      boxShadow: selected ? '0 8px 20px var(--accent-shadow)' : '0 2px 8px rgba(0,0,0,0.03)',
      transition: 'all .18s',
    }}>
      <span style={{ fontSize: 28 }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16.5, fontWeight: 800, color: selected ? 'var(--accent-deep)' : 'var(--ink)' }}>{label}</div>
        {sub && <div style={{ fontSize: 13, color: '#A7A1B0', marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{
        width: 24, height: 24, borderRadius: 99, flexShrink: 0,
        border: `2px solid ${selected ? 'var(--accent)' : '#DDD6E0'}`,
        background: selected ? 'var(--accent)' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
      }}>{selected && <Icon name="check" size={15} stroke={3.5} />}</div>
    </button>
  );
}

// building-plan transition
function BuildingPlan({ name }) {
  const [msg, setMsg] = React.useState(0);
  const lines = ['목표를 살펴보는 중…', '딱 맞는 강도를 고르는 중…', `${name}님만의 루틴을 짜는 중…`];
  React.useEffect(() => {
    const t = setInterval(() => setMsg((m) => Math.min(m + 1, lines.length - 1)), 750);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 20, background: 'var(--bg)', padding: 30,
    }}>
      <Mascot size={150} mood="cheer" float />
      <div className="jua" style={{ fontSize: 24, color: 'var(--ink)' }}>플랜을 만들고 있어요</div>
      <div key={msg} className="tf-rise" style={{ fontSize: 15.5, color: 'var(--accent-deep)', fontWeight: 700 }}>{lines[msg]}</div>
      <div style={{ width: 180, height: 8, background: '#EFE7F0', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg,var(--accent),var(--accent-deep))', borderRadius: 99, animation: 'tf-fill 2.4s linear forwards', width: '100%' }} />
      </div>
    </div>
  );
}

window.Onboarding = Onboarding;
