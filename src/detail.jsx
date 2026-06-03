// detail.jsx — exercise usage detail (steps + video links).

function Detail({ exId, onBack, onOpenChat, done, onToggleDone }) {
  const ex = EXERCISES[exId];
  const t = TONES[ex.tone];
  const ytUrl = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* top bar */}
      <div style={{
        flexShrink: 0, paddingTop: 56, paddingBottom: 10, padding: '56px 16px 10px',
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid #F2ECF3',
      }}>
        <button onClick={onBack} style={{ color: 'var(--ink)', padding: 4 }}><Icon name="back" size={26} /></button>
        <div className="jua" style={{ fontSize: 19, color: 'var(--ink)', flex: 1 }}>{ex.name}</div>
        <span style={{ fontSize: 11, fontWeight: 800, color: t.fg, background: t.bg, padding: '5px 11px', borderRadius: 99, marginRight: 4 }}>{ex.tag}</span>
      </div>

      <div className="tf-scroll" style={{ flex: 1, overflowY: 'auto' }}>
        {/* hero illustration placeholder */}
        <div style={{
          margin: '16px 18px 0', borderRadius: 26, padding: '24px 22px',
          background: `linear-gradient(155deg, ${t.solid}55, ${t.bg})`,
          border: `2px solid ${t.solid}`, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -8, top: -6, fontSize: 128, opacity: .22 }}>{ex.emoji}</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: t.fg, marginBottom: 4, position: 'relative' }}>{ex.target}</div>
          <div className="jua" style={{ fontSize: 27, color: 'var(--ink)', lineHeight: 1.2, position: 'relative' }}>{ex.name}</div>
          <div style={{ fontSize: 13, color: '#9A8FA0', marginTop: 2 }}>{ex.en}</div>
          {/* sets / rest chips */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <InfoChip icon="flame" label={ex.sets} />
            <InfoChip icon="clock" label={ex.rest} />
          </div>
        </div>

        {/* summary */}
        <div style={{ padding: '18px 22px 0', fontSize: 14.5, color: '#5C5868', lineHeight: 1.7 }}>
          {ex.summary}
        </div>

        {/* steps */}
        <SectionTitle>이렇게 해보세요</SectionTitle>
        <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ex.steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
              <div style={{
                width: 28, height: 28, flexShrink: 0, borderRadius: 99,
                background: 'var(--accent)', color: '#fff', fontFamily: "'Jua',sans-serif",
                fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: 1,
              }}>{i + 1}</div>
              <div style={{ fontSize: 14.5, color: '#4D4857', lineHeight: 1.62, paddingTop: 3 }}>{s}</div>
            </div>
          ))}
        </div>

        {/* video links */}
        <SectionTitle>영상으로 보기</SectionTitle>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <VideoCard
            tone={t}
            title={`${ex.name}, 1분 만에 배우기`}
            meta="유튜브에서 자세 영상 보기"
            href={ytUrl(ex.yt)}
          />
          <VideoCard
            tone={t}
            title={`${ex.target.split(' · ')[0]} 초보 가이드`}
            meta="자주 하는 실수까지 한 번에"
            href={ytUrl(ex.yt + ' 초보 실수')}
          />
        </div>

        {/* 토닥이 tip */}
        <SectionTitle>토닥이의 팁</SectionTitle>
        <div style={{ padding: '0 22px' }}>
          <div style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            background: 'var(--accent-bg)', borderRadius: 22, padding: '16px 16px',
          }}>
            <Mascot size={56} mood="wink" />
            <div style={{ flex: 1 }}>
              {ex.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, fontSize: 13.5, color: '#6B4654', lineHeight: 1.55, marginBottom: i < ex.tips.length - 1 ? 8 : 0 }}>
                  <span style={{ color: 'var(--accent-deep)', fontWeight: 900 }}>·</span>{tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* complete button */}
        <div style={{ padding: '22px 22px 26px' }}>
          <button onClick={onToggleDone} style={{
            width: '100%', padding: 16, borderRadius: 20,
            background: done ? '#DBF3EC' : 'var(--accent)',
            color: done ? '#1F9E86' : '#fff',
            fontFamily: "'Jua',sans-serif", fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: done ? 'none' : '0 10px 22px var(--accent-shadow)', transition: 'all .2s',
          }}>
            <Icon name="check" size={20} stroke={3} color={done ? '#1F9E86' : '#fff'} />
            {done ? '완료했어요! 잘했어요 👏' : '이 운동 완료하기'}
          </button>
          <button onClick={onOpenChat} style={{
            width: '100%', marginTop: 10, padding: 13, fontSize: 13.5, fontWeight: 800,
            color: 'var(--accent-deep)',
          }}>잘 모르겠어요 · 토닥이에게 물어보기</button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="jua" style={{ padding: '22px 22px 12px', fontSize: 18, color: 'var(--ink)' }}>{children}</div>
  );
}

function InfoChip({ icon, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, padding: '8px 13px',
      background: 'rgba(255,255,255,0.8)', borderRadius: 13, fontSize: 13, fontWeight: 700, color: '#5C5868',
    }}>
      <Icon name={icon} size={15} color="var(--accent-deep)" /> {label}
    </div>
  );
}

function VideoCard({ tone, title, meta, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'flex', alignItems: 'center', gap: 13, textDecoration: 'none',
      background: '#fff', borderRadius: 18, padding: 11,
      border: '1.5px solid #F4EEF4', boxShadow: '0 4px 12px rgba(80,60,90,0.04)',
    }}>
      {/* thumbnail placeholder */}
      <div style={{
        width: 92, height: 60, borderRadius: 13, flexShrink: 0,
        background: `linear-gradient(135deg, ${tone.solid}, ${tone.fg})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 99, background: 'rgba(255,255,255,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 3,
        }}>
          <Icon name="play" size={18} color={tone.fg} />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 12, color: '#A89BAE', marginTop: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ color: '#E0496C', fontWeight: 800 }}>▶ YouTube</span>{meta}
        </div>
      </div>
    </a>
  );
}

window.Detail = Detail;
