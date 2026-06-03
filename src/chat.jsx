// chat.jsx — AI 치어리더 토닥이 chatbot (real Claude API).

function Chat({ profile, version, onBack }) {
  const name = profile.name || '회원';
  const goalText = (profile.goals || []).map((g) => ({ diet: '다이어트', strength: '근력', stamina: '체력', posture: '자세교정' }[g])).join(', ');
  const expText = { beginner: '운동을 완전 처음 시작함', month: '운동 시작 한 달차, 그동안 유산소 위주', more: '운동 경력 있음' }[profile.exp] || '초보';

  const SYSTEM = `너는 '토닥이'라는 이름의 헬스케어 앱 AI 치어리더야. 여성 헬스 입문자를 전적으로 지지하고 응원하는 따뜻하고 다정한 작은 새 캐릭터야.

[너의 역할]
- 사용자가 운동을 계속할 수 있도록 진심으로 응원하고 동기부여를 줘.
- 절대 다그치거나 죄책감을 주지 마. 오늘 못 했어도 "괜찮아요"라고 먼저 말해줘.
- 웨이트 운동(자세, 루틴, 무게)과 식단(단백질, 다이어트, 간식) 질문에 쉽고 친절하게 답해줘.
- 의학적 진단은 하지 말고, 통증이 심하면 전문가 상담을 권해.

[말투]
- 한국어. 다정하고 귀엽지만 과하지 않게. 반말 X, 친근한 존댓말("~해요", "~예요").
- 2~4문장으로 짧고 따뜻하게. 가끔 이모지 1개 정도(🌷💪🌱✨).
- 사용자를 "${name}님"이라고 불러줘.

[사용자 정보]
- 이름: ${name}님
- 운동 목표: ${goalText || '건강'}
- 경력: ${expText}
${version === 'month' ? '- 지금 유산소를 넘어 근력 운동을 시작하도록 독려하는 시기야.' : '- 운동 첫날의 부담을 덜어주고 작은 시작을 칭찬해줘.'}`;

  const greeting = version === 'month'
    ? `${name}님, 한 달 동안 정말 잘 해왔어요! 이제 슬슬 근육을 깨워볼까요? 무엇이든 물어봐요 💪`
    : `안녕하세요 ${name}님, 저는 토닥이예요! 첫걸음을 함께할 수 있어 너무 기뻐요. 오늘 마음은 어때요? 🌷`;

  const [history, setHistory] = React.useState([{ role: 'bot', text: greeting }]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const scrollRef = React.useRef(null);
  const quick = ['오늘 너무 힘들어요 😢', '운동 가기 싫어요', '단백질은 얼마나 먹어요?', '스쿼트 자세가 어려워요'];

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, busy]);

  const send = async (textArg) => {
    const text = (textArg ?? input).trim();
    if (!text || busy) return;
    setInput('');
    const newHist = [...history, { role: 'user', text }];
    setHistory(newHist);
    setBusy(true);
    try {
      const transcript = newHist
        .map((m) => `${m.role === 'user' ? '사용자' : '토닥이'}: ${m.text}`)
        .join('\n');
      const prompt = `${SYSTEM}\n\n[지금까지의 대화]\n${transcript}\n\n토닥이로서 다음 답변을 한국어로 해줘. 따옴표나 "토닥이:" 같은 접두어 없이 답변 내용만 써.`;
      const reply = await window.claude.complete(prompt);
      setHistory((h) => [...h, { role: 'bot', text: (reply || '').trim() || '응, 듣고 있어요. 조금만 더 얘기해줄래요?' }]);
    } catch (e) {
      console.error('[토닥이 API 에러]', e);
      setHistory((h) => [...h, { role: 'bot', text: '앗, 잠시 연결이 흔들렸어요. 그래도 저는 항상 ' + name + '님 편이에요! 다시 한 번 말해줄래요? 🌷' }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* header */}
      <div style={{
        flexShrink: 0, padding: '54px 14px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #F2ECF3',
      }}>
        <button onClick={onBack} style={{ color: 'var(--ink)', padding: 4 }}><Icon name="back" size={26} /></button>
        <div style={{
          width: 44, height: 44, borderRadius: 99, background: 'var(--accent-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          <div style={{ marginTop: 8 }}><Mascot size={48} mood="happy" /></div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="jua" style={{ fontSize: 18, color: 'var(--ink)' }}>토닥이</div>
          <div style={{ fontSize: 12, color: '#1F9E86', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: '#34C99A', display: 'inline-block' }} />
            AI 치어리더 · 항상 곁에 있어요
          </div>
        </div>
        <div style={{ color: 'var(--accent)', marginRight: 6 }}><Icon name="spark" size={22} /></div>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="tf-scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 8px' }}>
        {history.map((m, i) => <Bubble key={i} role={m.role} text={m.text} />)}
        {busy && <TypingBubble />}
      </div>

      {/* quick replies */}
      {history.length <= 1 && !busy && (
        <div className="tf-scroll" style={{ flexShrink: 0, display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 16px 8px' }}>
          {quick.map((q) => (
            <button key={q} onClick={() => send(q)} style={{
              flexShrink: 0, padding: '9px 14px', borderRadius: 99, fontSize: 13, fontWeight: 700,
              background: '#fff', border: '1.5px solid #F0E2E7', color: 'var(--accent-deep)',
              whiteSpace: 'nowrap',
            }}>{q}</button>
          ))}
        </div>
      )}

      {/* input bar */}
      <div style={{
        flexShrink: 0, padding: '8px 14px 26px', display: 'flex', alignItems: 'center', gap: 9,
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid #F2ECF3',
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder="토닥이에게 무엇이든 물어보세요"
          style={{
            flex: 1, padding: '13px 16px', borderRadius: 99, border: '1.5px solid #EEE6F0',
            background: '#fff', fontSize: 15, color: 'var(--ink)', outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = '#EEE6F0'}
        />
        <button onClick={() => send()} disabled={!input.trim() || busy} style={{
          width: 46, height: 46, borderRadius: 99, flexShrink: 0,
          background: (input.trim() && !busy) ? 'var(--accent)' : '#EBE3EC',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: (input.trim() && !busy) ? '0 6px 14px var(--accent-shadow)' : 'none',
          transition: 'all .15s',
        }}>
          <Icon name="send" size={21} color="#fff" />
        </button>
      </div>
    </div>
  );
}

function Bubble({ role, text }) {
  const isUser = role === 'user';
  return (
    <div className="tf-rise" style={{
      display: 'flex', gap: 8, marginBottom: 12,
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
    }}>
      {!isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: 99, background: 'var(--accent-bg)', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          <div style={{ marginTop: 7 }}><Mascot size={36} mood="happy" /></div>
        </div>
      )}
      <div style={{
        maxWidth: '76%', padding: '11px 15px', fontSize: 14.5, lineHeight: 1.55,
        borderRadius: isUser ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
        background: isUser ? 'var(--accent)' : '#fff',
        color: isUser ? '#fff' : '#4D4857',
        border: isUser ? 'none' : '1.5px solid #F2ECF3',
        boxShadow: isUser ? '0 6px 14px var(--accent-shadow)' : '0 4px 12px rgba(80,60,90,0.05)',
        whiteSpace: 'pre-wrap',
      }}>{text}</div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-end' }}>
      <div style={{
        width: 34, height: 34, borderRadius: 99, background: 'var(--accent-bg)', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{ marginTop: 7 }}><Mascot size={36} mood="think" /></div>
      </div>
      <div style={{
        padding: '14px 16px', borderRadius: '20px 20px 20px 6px', background: '#fff',
        border: '1.5px solid #F2ECF3', display: 'flex', gap: 5,
      }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            width: 7, height: 7, borderRadius: 99, background: 'var(--accent)',
            animation: `tf-dots 1.2s ease-in-out ${i * 0.18}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

window.Chat = Chat;
