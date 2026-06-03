// mascot.jsx — 토닥이 (Todak), the cheerleader KANGAROO mascot 🦘💪
// Kangaroos are famously muscular — perfect for a strength-training buddy.
// One flexible SVG component. Props: size, mood, float.
// moods: 'happy' | 'cheer' | 'wave' | 'wink' | 'think' | 'sleepy'

function Mascot({ size = 120, mood = 'happy', float = false, style = {} }) {
  const blink = mood !== 'wink' && mood !== 'sleepy';
  const wrap = {
    width: size, height: size, display: 'inline-block',
    animation: float ? 'tf-float 4s ease-in-out infinite' : 'none',
    ...style,
  };

  // palette
  const fur = '#E8BB8C';
  const furD = '#D6A66C';
  const belly = '#FBF1E4';
  const inEar = '#FFC2D0';
  const nose = '#5A4636';
  const band = '#FF8FA3';
  const bandD = '#FF7B94';
  const cheek = '#FFAAC0';
  const eye = '#3A3550';

  const eyeAnim = (cx) => ({
    transformOrigin: `${cx}px 86px`,
    animation: blink ? 'tf-blink 4.6s ease-in-out infinite' : 'none',
  });

  const raised = mood === 'cheer' || mood === 'wave';

  return (
    <div style={wrap} aria-label="토닥이 캥거루 마스코트">
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        {/* ── ears (behind head) ── */}
        <g>
          <ellipse cx="74" cy="40" rx="13" ry="30" fill={fur} transform="rotate(-15 74 40)" />
          <ellipse cx="74" cy="42" rx="6.5" ry="21" fill={inEar} transform="rotate(-15 74 42)" />
          <ellipse cx="126" cy="40" rx="13" ry="30" fill={fur} transform="rotate(15 126 40)" />
          <ellipse cx="126" cy="42" rx="6.5" ry="21" fill={inEar} transform="rotate(15 126 42)" />
        </g>

        {/* ── tail ── */}
        <path d="M132 150 Q176 150 186 184 Q170 188 150 172 Q138 162 128 156 Z" fill={furD} />

        {/* ── feet ── */}
        <ellipse cx="84" cy="180" rx="20" ry="9" fill={furD} />
        <ellipse cx="116" cy="180" rx="20" ry="9" fill={furD} />

        {/* ── body + belly ── */}
        <ellipse cx="100" cy="142" rx="45" ry="41" fill={fur} />
        <ellipse cx="100" cy="150" rx="29" ry="31" fill={belly} />

        {/* ── resting arms (hidden when raised) ── */}
        {!raised && (
          <>
            <ellipse cx="63" cy="136" rx="9.5" ry="16" fill={fur} transform="rotate(16 63 136)" />
            <ellipse cx="137" cy="136" rx="9.5" ry="16" fill={fur} transform="rotate(-16 137 136)" />
          </>
        )}

        {/* ── head ── */}
        <ellipse cx="100" cy="86" rx="46" ry="44" fill={fur} />
        {/* muzzle */}
        <ellipse cx="100" cy="104" rx="23" ry="17" fill={belly} />

        {/* ── sweatband ── */}
        <path d="M57 68 Q100 50 143 68 L143 80 Q100 62 57 80 Z" fill={band} />
        <circle cx="147" cy="73" r="8" fill={bandD} />
        <circle cx="147" cy="73" r="3.5" fill="#FFD3DD" />

        {/* ── cheeks ── */}
        <ellipse cx="67" cy="99" rx="10" ry="7.5" fill={cheek} opacity="0.8" />
        <ellipse cx="133" cy="99" rx="10" ry="7.5" fill={cheek} opacity="0.8" />

        {/* ── eyes ── */}
        {mood === 'wink' ? (
          <>
            <ellipse cx="82" cy="86" rx="6.5" ry="7.2" fill={eye} />
            <circle cx="84.2" cy="83.4" r="2.1" fill="#fff" />
            <path d="M111 86 q7 -6 14 0" stroke={eye} strokeWidth="3.4" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'sleepy' ? (
          <>
            <path d="M75 86 q7 5 14 0" stroke={eye} strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M111 86 q7 5 14 0" stroke={eye} strokeWidth="3.2" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'think' ? (
          <>
            <ellipse cx="84" cy="83" rx="6" ry="6.6" fill={eye} style={eyeAnim(84)} />
            <circle cx="86" cy="80.6" r="2" fill="#fff" />
            <ellipse cx="120" cy="83" rx="6" ry="6.6" fill={eye} style={eyeAnim(120)} />
            <circle cx="122" cy="80.6" r="2" fill="#fff" />
          </>
        ) : (
          <>
            <ellipse cx="82" cy="86" rx="6.8" ry="7.5" fill={eye} style={eyeAnim(82)} />
            <circle cx="84.4" cy="83.2" r="2.2" fill="#fff" />
            <ellipse cx="118" cy="86" rx="6.8" ry="7.5" fill={eye} style={eyeAnim(118)} />
            <circle cx="120.4" cy="83.2" r="2.2" fill="#fff" />
          </>
        )}

        {/* ── nose + mouth ── */}
        <ellipse cx="100" cy="97" rx="6.5" ry="5" fill={nose} />
        <ellipse cx="98" cy="95.4" rx="2" ry="1.4" fill="#fff" opacity="0.5" />
        {mood === 'cheer' || mood === 'happy' || mood === 'wave' ? (
          <path d="M92 106 q8 8 16 0" stroke={nose} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M95 106 q5 4 10 0" stroke={nose} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        )}

        {/* ── arms ── */}
        {mood === 'cheer' && (
          <g>
            {/* both arms up, flexed with biceps */}
            <path d="M62 118 L48 92" stroke={fur} strokeWidth="13" strokeLinecap="round" />
            <circle cx="48" cy="90" r="8.5" fill={fur} />
            <circle cx="55" cy="103" r="7.5" fill={furD} opacity="0.55" />
            <path d="M138 118 L152 92" stroke={fur} strokeWidth="13" strokeLinecap="round" />
            <circle cx="152" cy="90" r="8.5" fill={fur} />
            <circle cx="145" cy="103" r="7.5" fill={furD} opacity="0.55" />
            {/* sparkles */}
            <path d="M40 78 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill={band} />
            <path d="M160 78 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 z" fill={band} />
          </g>
        )}
        {mood === 'wave' && (
          <g>
            <path d="M138 120 L156 96" stroke={fur} strokeWidth="13" strokeLinecap="round" />
            <circle cx="157" cy="94" r="8.5" fill={fur} />
            <path d="M150 84 q4 -3 7 1" stroke={band} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}

window.Mascot = Mascot;
