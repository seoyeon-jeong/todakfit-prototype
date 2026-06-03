// app.jsx — orchestrator: routing, state, persistence, tweaks, device frame.

const STORE_KEY = 'todakfit_v1';

const ACCENTS = {
  pink:  ['#FF8FA3', '#E0496C', '#FFE6EC'],
  coral: ['#FF9E6D', '#E8743C', '#FFE8DC'],
  lav:   ['#A78BFA', '#7B5BD6', '#ECE4FB'],
  mint:  ['#54C9BE', '#1F9E86', '#DBF3EC'],
};

function hexA(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#FF8FA3", "#E0496C", "#FFE6EC"],
  "roundedHeads": true,
  "bg": "#FFF7F4"
}/*EDITMODE-END*/;

function ApiKeyModal({ onClose }) {
  const [key, setKey] = React.useState(window.claude.getKey() || '');
  const save = () => { window.claude.setKey(key.trim()); onClose(); };
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999, padding:24 }}>
      <div style={{ background:'#fff', borderRadius:24, padding:'28px 24px', maxWidth:360, width:'100%', boxShadow:'0 24px 60px rgba(0,0,0,0.22)' }}>
        <div className="jua" style={{ fontSize:20, color:'#3D3A42', marginBottom:8 }}>Gemini API 키 설정</div>
        <div style={{ fontSize:13.5, color:'#9A94A4', lineHeight:1.6, marginBottom:18 }}>
          Google AI Studio에서 발급받은 키를 입력해주세요.<br />
          키는 이 브라우저에만 저장돼요.
        </div>
        <input value={key} onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); }}
          placeholder="AQ.Ab8... 또는 AIzaSy..."
          style={{ width:'100%', padding:'13px 16px', borderRadius:14, border:'2px solid #F0E7F1', fontSize:13, outline:'none', marginBottom:14, fontFamily:'monospace' }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = '#F0E7F1'}
        />
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={onClose} style={{ flex:1, padding:13, borderRadius:14, background:'#F2EAF1', fontSize:15, fontWeight:700, color:'#9A94A4' }}>취소</button>
          <button onClick={save} style={{ flex:2, padding:13, borderRadius:14, background:'var(--accent)', fontSize:15, fontWeight:700, color:'#fff', boxShadow:'0 8px 18px var(--accent-shadow)' }}>저장</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [showApiModal, setShowApiModal] = React.useState(!window.claude.getKey());

  // persisted app state
  const load = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } };
  const saved = load();

  const [screen, setScreen] = React.useState(saved.screen || 'onboarding');
  const [tab, setTab] = React.useState(saved.tab || 'home');
  const [profile, setProfile] = React.useState(saved.profile || null);
  const [version, setVersion] = React.useState(saved.version || 'beginner');
  const [exId, setExId] = React.useState(saved.exId || null);

  React.useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ screen, tab, profile, version, exId }));
  }, [screen, tab, profile, version, exId]);

  const accent = Array.isArray(t.accent) ? t.accent : ACCENTS.pink;
  const cssVars = {
    '--accent': accent[0],
    '--accent-deep': accent[1],
    '--accent-bg': accent[2],
    '--accent-shadow': hexA(accent[0], 0.42),
    '--bg': t.bg || '#FFF7F4',
    '--ink': '#3D3A42',
    '--jua-family': t.roundedHeads ? "'Jua'" : "'Gothic A1'",
  };

  const completeOnboarding = (p) => {
    setProfile(p);
    setVersion(p.exp === 'beginner' ? 'beginner' : 'month');
    setTab('home');
    setScreen('home');
  };

  const resetAll = () => {
    localStorage.removeItem(STORE_KEY);
    setProfile(null); setScreen('onboarding'); setTab('home'); setVersion('beginner'); setExId(null);
  };

  const openDetail = (id) => { setExId(id); setScreen('detail'); };
  const openChat = () => setScreen('chat');

  // ── screen rendering ──
  let body;
  if (screen === 'onboarding' || !profile) {
    body = <Onboarding onComplete={completeOnboarding} />;
  } else if (screen === 'detail') {
    body = <Detail exId={exId} onBack={() => setScreen('home')} onOpenChat={openChat} />;
  } else if (screen === 'chat') {
    body = <Chat profile={profile} version={version} onBack={() => setScreen('home')} />;
  } else {
    // main tabbed area (home / gear / log)
    body = (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--bg)' }}>
        <div style={{ flex: 1, minHeight: 0 }}>
          {tab === 'home' && (
            <Home
              profile={profile}
              version={version}
              onToggleVersion={setVersion}
              onOpenDetail={openDetail}
              onOpenChat={openChat}
            />
          )}
          {(tab === 'gear' || tab === 'log') && <ComingSoon tab={tab} />}
        </div>

        {/* floating AI 치어리더 button (home only) */}
        {tab === 'home' && (
          <button onClick={openChat} aria-label="AI 치어리더" style={{
            position: 'absolute', right: 18, bottom: 96, zIndex: 30,
            width: 62, height: 62, borderRadius: 99, background: '#fff',
            border: '2.5px solid var(--accent)',
            boxShadow: '0 10px 24px var(--accent-shadow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'tf-bob 3s ease-in-out infinite', overflow: 'hidden',
          }}>
            <div style={{ marginTop: 11 }}><Mascot size={56} mood="wave" /></div>
            <span style={{
              position: 'absolute', top: -4, right: -2, background: 'var(--accent)', color: '#fff',
              fontSize: 12, fontWeight: 900, padding: '2px 7px', borderRadius: 99,
              fontFamily: "'Jua',sans-serif",
            }}>AI</span>
          </button>
        )}

        <BottomNav active={tab} onNav={setTab} />
      </div>
    );
  }

  return (
    <>
      <IOSDevice>
        <div style={{ height: '100%', ...cssVars, fontFamily: "'Gothic A1', sans-serif" }}>
          {body}
        </div>
      </IOSDevice>

      <TweaksPanel>
        <TweakSection label="브랜드 컬러" />
        <TweakColor label="포인트 색"
          value={t.accent}
          options={[ACCENTS.pink, ACCENTS.coral, ACCENTS.lav, ACCENTS.mint]}
          onChange={(v) => setTweak('accent', v)} />
        <TweakColor label="배경 톤"
          value={t.bg}
          options={['#FFF7F4', '#FFFDF7', '#F6F8FB', '#FFFFFF']}
          onChange={(v) => setTweak('bg', v)} />
        <TweakSection label="타이포" />
        <TweakToggle label="둥근 제목 글씨 (Jua)" value={t.roundedHeads}
          onChange={(v) => setTweak('roundedHeads', v)} />
        <TweakSection label="데모" />
        <TweakRadio label="홈 버전" value={version}
          options={['beginner', 'month']}
          onChange={(v) => { setVersion(v); setScreen('home'); setTab('home'); }} />
        <TweakButton label="온보딩 다시 보기" onClick={resetAll} />
        <TweakSection label="AI 설정" />
        <TweakButton label="Gemini API 키 설정" onClick={() => setShowApiModal(true)} />
      </TweaksPanel>

      {showApiModal && <ApiKeyModal onClose={() => setShowApiModal(false)} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
