// home.jsx — main home screen. Two versions (beginner / month) by experience.

function Home({ profile, version, onToggleVersion, onOpenDetail, onOpenChat, completed = {} }) {
  const routine = ROUTINES[version];
  const cheer = CHEER[version];
  const name = profile.name || '회원';
  const cheerLine = cheer.line.replace('{name}', name);

  return (
    <div className="tf-scroll" style={{ height: '100%', overflowY: 'auto', background: 'var(--bg)' }}>
      {/* ── header ── */}
      <div style={{ padding: '60px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              <span className="jua" style={{ fontSize: 32, color: 'var(--ink)' }}>Day {routine.day}</span>
              <span style={{ fontSize: 26 }}>🔥</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, color: '#A89BAE', fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
              <Icon name="clock" size={15} color="#B7A7BD" />
              <span>{routine.duration}</span>
              <span style={{ opacity: .5 }}>·</span>
              <span>{routine.title}</span>
            </div>
          </div>
          {/* version toggle */}
          <VersionToggle version={version} onToggle={onToggleVersion} />
        </div>
        <div style={{ height: 2, background: 'linear-gradient(90deg,#F0E3E8,transparent)', borderRadius: 99, marginTop: 16 }} />
      </div>

      {/* ── 오늘의 루틴 title ── */}
      <div style={{ padding: '20px 22px 4px' }}>
        <span className="jua" style={{ fontSize: 23, color: 'var(--ink)', lineHeight: 1.35 }}>
          <span style={{ color: 'var(--accent-deep)' }}>{name}</span>님을 위한 오늘의 루틴
        </span>
      </div>
      <div style={{ padding: '0 22px 4px', fontSize: 13, color: '#A89BAE' }}>
        기구 이름을 누르면 사용법을 볼 수 있어요
      </div>

      {/* ── routine list ── */}
      <div style={{ padding: '12px 18px 4px', display: 'flex', flexDirection: 'column', gap: 11 }}>
        {routine.list.map((id, i) => (
          <RoutineRow key={id} index={i + 1} ex={EXERCISES[id]} done={!!completed[id]} onClick={() => onOpenDetail(id)} />
        ))}
      </div>

      {/* ── cheer card (→ chat) ── */}
      <div style={{ padding: '18px 22px 8px' }}>
        <div style={{ position: 'relative', paddingRight: 8 }}>
          <SpeechBubble onClick={onOpenChat}>
            <div className="jua" style={{ fontSize: 19, color: 'var(--ink)', lineHeight: 1.35 }}>{cheerLine}</div>
            <div style={{ fontSize: 13.5, color: '#7C7689', lineHeight: 1.6, marginTop: 8, paddingRight: 60 }}>{cheer.sub}</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 12,
              color: 'var(--accent-deep)', fontWeight: 800, fontSize: 13,
            }}>
              <Icon name="spark" size={15} /> 토닥이랑 이야기하기
            </div>
          </SpeechBubble>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6, marginRight: 4 }}>
            <Mascot size={92} mood={cheer.mood} float />
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}

// ── version toggle pill ──
function VersionToggle({ version, onToggle }) {
  const opts = [{ id: 'beginner', label: '입문' }, { id: 'month', label: '한 달차' }];
  return (
    <div style={{
      display: 'flex', background: '#F2EAF1', borderRadius: 99, padding: 3,
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
    }}>
      {opts.map((o) => {
        const on = version === o.id;
        return (
          <button key={o.id} onClick={() => onToggle(o.id)} style={{
            padding: '7px 12px', borderRadius: 99, fontSize: 12.5, fontWeight: 800,
            background: on ? '#fff' : 'transparent',
            color: on ? 'var(--accent-deep)' : '#A89BAE',
            boxShadow: on ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
            transition: 'all .18s',
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// ── single routine row ──
function RoutineRow({ index, ex, done, onClick }) {
  const t = TONES[ex.tone];
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 13,
      background: done ? '#F6FDF9' : '#fff', borderRadius: 20, padding: '12px 14px',
      border: done ? '1.5px solid #B8EDD8' : '1.5px solid #F4EEF4',
      boxShadow: '0 4px 12px rgba(80,60,90,0.04)',
      cursor: 'pointer', transition: 'transform .12s ease, box-shadow .2s',
      opacity: done ? 0.82 : 1,
    }}
    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(.985)'}
    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{
        width: 50, height: 50, borderRadius: 15, flexShrink: 0,
        background: done ? '#DBF3EC' : t.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, position: 'relative',
      }}>
        {done ? '✅' : ex.emoji}
        <span style={{
          position: 'absolute', top: -6, left: -6, width: 22, height: 22, borderRadius: 99,
          background: done ? '#34C99A' : 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #fff',
        }}>{done ? '✓' : index}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16.5, fontWeight: 800, color: done ? '#2D9E7A' : 'var(--ink)', textDecoration: done ? 'line-through' : 'none' }}>{ex.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: done ? '#34C99A' : t.fg, background: done ? '#DBF3EC' : t.bg, padding: '2px 8px', borderRadius: 99, flexShrink: 0 }}>{done ? '완료' : ex.tag}</span>
          <span style={{ fontSize: 12.5, color: '#A89BAE' }}>{ex.sets}</span>
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, whiteSpace: 'nowrap',
        padding: '8px 11px', borderRadius: 13,
        background: done ? '#DBF3EC' : 'var(--accent-bg)',
        color: done ? '#1F9E86' : 'var(--accent-deep)', fontSize: 13, fontWeight: 800,
      }}>
        {done ? '완료 ✓' : <>{`방법보기`} <Icon name="chevron" size={14} stroke={2.6} /></>}
      </div>
    </div>
  );
}

window.Home = Home;
