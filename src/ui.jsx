// ui.jsx — shared visual primitives, tone palette, bottom nav, icons.

const TONES = {
  pink:   { bg: '#FFE6EC', fg: '#E0496C', solid: '#FF8FA3' },
  mint:   { bg: '#DBF3EC', fg: '#1F9E86', solid: '#7FD9C4' },
  lav:    { bg: '#ECE4FB', fg: '#7B5BD6', solid: '#C3AEF0' },
  peach:  { bg: '#FFE8DC', fg: '#E8743C', solid: '#FFBE9D' },
  butter: { bg: '#FFF1CE', fg: '#C99500', solid: '#FFD970' },
};
window.TONES = TONES;

// ── Simple stroked icons (24x24) ──
function Icon({ name, size = 24, color = 'currentColor', stroke = 2 }) {
  const p = { fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path d="M4 11l8-7 8 7" {...p} /><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" {...p} /></>,
    dumbbell: <><path d="M2 12h2M20 12h2M6 8v8M18 8v8M9 10v4M15 10v4M9 12h6" {...p} /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...p} /></>,
    chevron: <path d="M9 6l6 6-6 6" {...p} />,
    back: <path d="M15 6l-6 6 6 6" {...p} />,
    play: <path d="M8 5v14l11-7z" fill={color} stroke="none" />,
    send: <path d="M4 12l16-7-7 16-2-7-7-2z" {...p} />,
    close: <path d="M6 6l12 12M18 6L6 18" {...p} />,
    spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" {...p} /></>,
    check: <path d="M5 12l5 5L20 6" {...p} />,
    clock: <><circle cx="12" cy="12" r="9" {...p} /><path d="M12 7v5l3 2" {...p} /></>,
    flame: <path d="M12 3c1 3-2 4-2 7a2 2 0 1 0 4 0c2 2 3 3 3 6a5 5 0 0 1-10 0c0-4 3-5 5-13z" {...p} />,
    search: <><circle cx="11" cy="11" r="6.5" {...p} /><path d="M16.5 16.5L21 21" {...p} /></>,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" {...p} /><circle cx="12" cy="13" r="4" {...p} /></>,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" {...p} />,
    people: <><circle cx="9" cy="7" r="4" {...p} /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" {...p} /><path d="M16 3.13a4 4 0 0 1 0 7.75" {...p} /><path d="M21 21v-2a4 4 0 0 0-3-3.87" {...p} /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {paths[name]}
    </svg>
  );
}
window.Icon = Icon;

// ── Pill / chip selector ──
function Chip({ label, emoji, selected, tone = 'pink', onClick, big }) {
  const t = TONES[tone];
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: big ? '15px 18px' : '11px 16px',
      borderRadius: 18,
      background: selected ? t.bg : '#fff',
      border: `2px solid ${selected ? t.solid : '#F0ECF2'}`,
      color: selected ? t.fg : '#5C5868',
      fontWeight: selected ? 800 : 600,
      fontSize: big ? 17 : 15,
      boxShadow: selected ? `0 6px 16px ${t.solid}44` : '0 2px 6px rgba(0,0,0,0.03)',
      transition: 'all .18s ease', whiteSpace: 'nowrap',
    }}>
      {emoji && <span style={{ fontSize: big ? 22 : 18 }}>{emoji}</span>}
      <span>{label}</span>
    </button>
  );
}
window.Chip = Chip;

// ── Big primary button ──
function PrimaryButton({ children, onClick, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', padding: '17px', borderRadius: 20,
      background: disabled ? '#EBE6EE' : 'var(--accent)',
      color: disabled ? '#B6AFBD' : '#fff',
      fontFamily: "'Jua', sans-serif", fontSize: 19, letterSpacing: 0.3,
      boxShadow: disabled ? 'none' : '0 10px 22px var(--accent-shadow)',
      transition: 'transform .12s ease, box-shadow .2s ease',
      position: 'relative', overflow: 'hidden',
    }}
    onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(.97)'; }}
    onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >{children}</button>
  );
}
window.PrimaryButton = PrimaryButton;

// ── Speech bubble (mascot) ──
function SpeechBubble({ children, onClick, accentMsg }) {
  return (
    <div onClick={onClick} style={{
      position: 'relative', cursor: onClick ? 'pointer' : 'default',
      background: '#fff', borderRadius: 24,
      border: '2px solid #FCE2E8',
      padding: '18px 18px 20px',
      boxShadow: '0 12px 30px rgba(255,143,163,0.16)',
    }}>
      {children}
      {/* tail toward mascot (bottom-right) */}
      <svg width="34" height="22" viewBox="0 0 34 22" style={{ position: 'absolute', right: 28, bottom: -19 }}>
        <path d="M2 1 Q8 18 30 20 Q14 14 12 1 Z" fill="#fff" stroke="#FCE2E8" strokeWidth="2" />
      </svg>
    </div>
  );
}
window.SpeechBubble = SpeechBubble;

// ── Bottom navigation (기구 | 홈 | 커뮤니티 | 기록) ──
function BottomNav({ active, onNav }) {
  const items = [
    { id: 'gear',      label: '기구',    icon: 'dumbbell' },
    { id: 'home',      label: '홈',      icon: 'home'     },
    { id: 'community', label: '커뮤니티', icon: 'people'   },
    { id: 'log',       label: '기록',    icon: 'chart'    },
  ];
  return (
    <div style={{
      flexShrink: 0,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderTop: '1px solid #F2ECF3',
      padding: '8px 18px 30px',
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
    }}>
      {items.map((it) => {
        const on = active === it.id;
        return (
          <button key={it.id} onClick={() => onNav(it.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: on ? 'var(--accent-deep)' : '#B7B1C0', flex: 1, paddingTop: 4,
            transition: 'color .15s',
          }}>
            <div style={{
              transform: on ? 'translateY(-2px)' : 'none', transition: 'transform .2s',
            }}>
              <Icon name={it.icon} size={26} stroke={on ? 2.4 : 2} />
            </div>
            <span style={{ fontSize: 11.5, fontWeight: on ? 800 : 600 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
window.BottomNav = BottomNav;

// ── "Coming soon" placeholder screen for non-core tabs ──
function ComingSoon({ tab }) {
  const map = {
    gear: { t: '기구 도감', s: '헬스장 기구를 한눈에 모아볼 수 있는\n도감을 준비하고 있어요.' },
    log: { t: '나의 기록', s: '운동 완료와 연속 일수를\n예쁘게 모아드릴게요.' },
  };
  const m = map[tab] || map.gear;
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 14, padding: 30,
      textAlign: 'center',
    }}>
      <Mascot size={130} mood="sleepy" float />
      <div className="jua" style={{ fontSize: 24, color: 'var(--ink)' }}>{m.t}</div>
      <div style={{ fontSize: 15, color: '#9A94A4', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{m.s}</div>
      <div style={{
        marginTop: 6, padding: '8px 16px', borderRadius: 999,
        background: 'var(--accent-bg)', color: 'var(--accent-deep)',
        fontWeight: 800, fontSize: 13,
      }}>곧 만나요!</div>
    </div>
  );
}
window.ComingSoon = ComingSoon;
