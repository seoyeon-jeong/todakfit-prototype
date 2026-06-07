// gear.jsx — 기구 도감 화면 (전체 목록 + 검색 + 카메라 인식)

const EQUIPMENT_LIST = [
  { id: 'treadmill',     name: '트레드밀',           en: 'Treadmill',            emoji: '🏃',   target: '유산소 · 전신',        tag: '유산소', tone: 'butter' },
  { id: 'bike',          name: '사이클',              en: 'Stationary Bike',      emoji: '🚴',   target: '유산소 · 하체',        tag: '유산소', tone: 'butter' },
  { id: 'elliptical',    name: '일립티컬',            en: 'Elliptical',           emoji: '⭕',   target: '유산소 · 전신 저충격', tag: '유산소', tone: 'butter' },
  { id: 'legpress',      name: '레그 프레스',         en: 'Leg Press',            emoji: '🦵',   target: '하체 · 허벅지/엉덩이', tag: '머신',   tone: 'mint'   },
  { id: 'latpulldown',   name: '랫 풀다운',           en: 'Lat Pulldown',         emoji: '🪶',   target: '등 · 광배근',          tag: '머신',   tone: 'lav'    },
  { id: 'chestpress',    name: '체스트 프레스',       en: 'Chest Press',          emoji: '💪',   target: '가슴 · 어깨 앞',       tag: '머신',   tone: 'peach'  },
  { id: 'legcurl',       name: '레그 컬',             en: 'Seated Leg Curl',      emoji: '🦿',   target: '뒷벅지 · 햄스트링',    tag: '머신',   tone: 'mint'   },
  { id: 'seatedrow',     name: '시티드 로우',         en: 'Seated Row',           emoji: '🚣',   target: '등 · 가운데',          tag: '머신',   tone: 'lav'    },
  { id: 'shoulderpress', name: '숄더 프레스',         en: 'Shoulder Press',       emoji: '🙆‍♀️', target: '어깨 · 팔',            tag: '머신',   tone: 'peach'  },
  { id: 'legextension',  name: '레그 익스텐션',       en: 'Leg Extension',        emoji: '🦶',   target: '앞벅지 · 대퇴사두근',  tag: '머신',   tone: 'mint'   },
  { id: 'pecfly',        name: '펙 덱 플라이',        en: 'Pec Deck Fly',         emoji: '🦋',   target: '가슴 · 안쪽',          tag: '머신',   tone: 'peach'  },
  { id: 'smithmachine',  name: '스미스 머신',         en: 'Smith Machine',        emoji: '🏗️',  target: '전신 · 하체/가슴',     tag: '머신',   tone: 'mint'   },
  { id: 'cablecross',    name: '케이블 크로스오버',   en: 'Cable Crossover',      emoji: '🔗',   target: '가슴 · 코어',          tag: '케이블', tone: 'pink'   },
  { id: 'cablerow',      name: '케이블 로우',         en: 'Cable Row',            emoji: '⚓',   target: '등 · 광배근',          tag: '케이블', tone: 'lav'    },
  { id: 'goblet',        name: '고블릿 스쿼트',       en: 'Goblet Squat',         emoji: '🏋️‍♀️', target: '하체 · 전신',         tag: '덤벨',   tone: 'peach'  },
  { id: 'rdl',           name: '루마니안 데드리프트', en: 'Romanian Deadlift',    emoji: '🍑',   target: '엉덩이 · 뒷벅지',      tag: '덤벨',   tone: 'lav'    },
];

const TAG_FILTERS = [
  { id: 'all',    label: '전체' },
  { id: '머신',   label: '머신' },
  { id: '유산소', label: '유산소' },
  { id: '덤벨',  label: '덤벨' },
  { id: '케이블', label: '케이블' },
];

function Gear() {
  const [query,      setQuery]      = React.useState('');
  const [tagFilter,  setTagFilter]  = React.useState('all');
  const [cameraOn,   setCameraOn]   = React.useState(false);
  const [scanning,   setScanning]   = React.useState(false);
  const [scanResult, setScanResult] = React.useState(null);

  const filtered = EQUIPMENT_LIST.filter((eq) => {
    const matchTag = tagFilter === 'all' || eq.tag === tagFilter;
    const q = query.toLowerCase();
    const matchQ = !q
      || eq.name.toLowerCase().includes(q)
      || eq.en.toLowerCase().includes(q)
      || eq.target.toLowerCase().includes(q)
      || eq.tag.includes(q);
    return matchTag && matchQ;
  });

  const handleCamera = () => {
    setCameraOn(true);
    setScanResult(null);
    setScanning(false);
  };

  const handleScan = () => {
    setScanning(true);
    // simulate scan recognition after 1.5 s
    setTimeout(() => {
      setScanning(false);
      setScanResult(EQUIPMENT_LIST[Math.floor(Math.random() * EQUIPMENT_LIST.length)]);
    }, 1500);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F2ECF3', flexShrink: 0 }}>
        <div style={{ padding: '56px 18px 14px' }}>
          <div className="jua" style={{ fontSize: 24, color: 'var(--ink)', marginBottom: 12 }}>기구 도감</div>

          {/* search row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 8,
              background: '#F6F1F8', borderRadius: 14, padding: '11px 14px',
            }}>
              <Icon name="search" size={17} color="#B7B1C0" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setScanResult(null); }}
                placeholder="기구 이름 또는 부위로 검색"
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  fontSize: 14, color: 'var(--ink)',
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ color: '#C0BAC8', fontSize: 16, lineHeight: 1 }}>×</button>
              )}
            </div>

            {/* camera / lens button */}
            <button
              onClick={handleCamera}
              aria-label="기구 사진으로 검색"
              style={{
                width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                background: cameraOn ? 'var(--accent)' : '#F6F1F8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: cameraOn ? '0 4px 14px var(--accent-shadow)' : 'none',
                transition: 'all .2s',
              }}
            >
              <Icon name="camera" size={20} color={cameraOn ? '#fff' : '#B7B1C0'} />
            </button>
          </div>

          {/* tag filters */}
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }} className="tf-scroll">
            {TAG_FILTERS.map((tf) => {
              const on = tagFilter === tf.id;
              return (
                <button key={tf.id} onClick={() => setTagFilter(tf.id)} style={{
                  padding: '7px 15px', borderRadius: 99, fontSize: 13, fontWeight: 800,
                  background: on ? 'var(--accent)' : '#F2EAF1',
                  color: on ? '#fff' : '#A89BAE',
                  transition: 'all .15s', flexShrink: 0,
                }}>{tf.label}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* camera panel */}
      {cameraOn && (
        <div className="tf-rise" style={{
          margin: '12px 18px 0', borderRadius: 20, overflow: 'hidden',
          border: '2px solid var(--accent)', background: '#fff',
          boxShadow: '0 8px 24px var(--accent-shadow)',
        }}>
          {/* viewfinder mock */}
          <div style={{
            height: 160, background: '#1A1A2E', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* corner brackets */}
            {[['0%','0%','right','bottom'],['100%','0%','left','bottom'],['0%','100%','right','top'],['100%','100%','left','top']].map(([l,t,br,bb], i) => (
              <div key={i} style={{
                position: 'absolute', left: l, top: t,
                width: 28, height: 28,
                borderRight: br === 'right' ? 'none' : '3px solid var(--accent)',
                borderLeft:  br === 'left'  ? 'none' : '3px solid var(--accent)',
                borderBottom: bb === 'bottom' ? 'none' : '3px solid var(--accent)',
                borderTop:    bb === 'top'    ? 'none' : '3px solid var(--accent)',
                margin: 12,
              }} />
            ))}

            {scanning ? (
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: 28, marginBottom: 8, animation: 'tf-bob 1s ease-in-out infinite' }}>🔍</div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>기구 인식 중…</div>
                {/* scanning line */}
                <div style={{
                  position: 'absolute', left: 12, right: 12, top: '50%',
                  height: 2, background: 'var(--accent)', opacity: 0.7,
                  animation: 'tf-fill 1.5s ease-in-out infinite alternate',
                }} />
              </div>
            ) : scanResult ? (
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: 32, marginBottom: 4 }}>{scanResult.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 800 }}>{scanResult.name}</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                기구를 카메라에 비춰주세요
              </div>
            )}
          </div>

          <div style={{ padding: '12px 16px' }}>
            {scanResult ? (
              <div className="tf-rise" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 13,
                  background: TONES[scanResult.tone].bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{scanResult.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)' }}>{scanResult.name}</div>
                  <div style={{ fontSize: 12, color: '#A89BAE' }}>{scanResult.target}</div>
                </div>
                <button onClick={() => { setCameraOn(false); setScanResult(null); setScanning(false); }}
                  style={{ color: '#B7B1C0' }}>
                  <Icon name="close" size={20} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleScan} style={{
                  flex: 1, padding: '11px', borderRadius: 14,
                  background: 'var(--accent)', color: '#fff', fontWeight: 800, fontSize: 14,
                  boxShadow: '0 6px 16px var(--accent-shadow)',
                }}>
                  📸 사진 촬영해서 인식하기
                </button>
                <button onClick={() => { setCameraOn(false); setScanResult(null); }} style={{
                  padding: '11px 14px', borderRadius: 14,
                  background: '#F2EAF1', color: '#A89BAE', fontWeight: 800, fontSize: 14,
                }}>취소</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* hint text */}
      {!cameraOn && !query && (
        <div style={{ padding: '10px 18px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="camera" size={14} color="#C0BAC8" />
          <span style={{ fontSize: 12, color: '#C0BAC8', fontWeight: 600 }}>
            카메라 버튼으로 기구 사진 촬영해서 바로 검색할 수 있어요
          </span>
        </div>
      )}

      {/* list */}
      <div className="tf-scroll" style={{ flex: 1, overflowY: 'auto', padding: '10px 18px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A89BAE' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>검색 결과가 없어요</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((eq) => <EquipmentCard key={eq.id} eq={eq} />)}
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function EquipmentCard({ eq }) {
  const t = TONES[eq.tone];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: '#fff', borderRadius: 18, padding: '13px 15px',
      border: '1.5px solid #F4EEF4',
      boxShadow: '0 3px 10px rgba(80,60,90,0.04)',
    }}>
      <div style={{
        width: 50, height: 50, borderRadius: 15, background: t.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, flexShrink: 0,
      }}>{eq.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--ink)', marginBottom: 3 }}>{eq.name}</div>
        <div style={{ fontSize: 12, color: '#A89BAE' }}>{eq.target}</div>
      </div>
      <span style={{
        fontSize: 11, fontWeight: 800, color: t.fg, background: t.bg,
        padding: '3px 9px', borderRadius: 99, flexShrink: 0,
      }}>{eq.tag}</span>
    </div>
  );
}

window.Gear = Gear;
