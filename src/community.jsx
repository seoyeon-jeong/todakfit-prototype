// community.jsx — 헬스 메이트 커뮤니티 화면

const COMMUNITY_POSTS = [
  {
    id: 'p1',
    author: '서연코치',
    authorAvatar: '🏋️‍♂️',
    isCoach: true,
    time: '8분 전',
    title: '초보자를 위한 운동루틴 추천! 💪',
    preview: '저도 처음엔 뭐부터 해야 할지 몰랐는데, 레그프레스부터 시작했어요. 헬린이 눈높이 맞춤 루틴 공유해요!',
    likes: 56,
    comments: 12,
    isRecommended: true,
    image: null,
  },
  {
    id: 'p2',
    author: '소은코치',
    authorAvatar: '👩‍💼',
    isCoach: true,
    time: '41분 전',
    title: '2026 6월 바디빌딩 & 피트니스 ...',
    preview: '이번 달 루틴 공유해요. 초보자도 따라할 수 있어요!',
    likes: 32,
    comments: 8,
    isRecommended: false,
  },
  {
    id: 'p3',
    author: '민택코치',
    authorAvatar: '👨‍💼',
    isCoach: true,
    time: '2시간 전',
    title: '크레아틴의 효능 알아보기!',
    preview: '크레아틴이 뭔지, 초보자도 먹어도 되는지 궁금하죠?',
    likes: 21,
    comments: 5,
    isRecommended: false,
  },
  {
    id: 'p4',
    author: '서연코치',
    authorAvatar: '🏋️‍♂️',
    isCoach: true,
    time: '어제 오후 6:15',
    title: '오늘의 식단!!',
    preview: '단백질 챙기는 법, 초보자도 쉽게!',
    likes: 18,
    comments: 4,
    isRecommended: false,
  },
];

const RECOMMENDED_USERS = [
  { id: 'u1', name: '다이어터',   emoji: '🏃‍♀️', badge: '입문 2주차' },
  { id: 'u2', name: '마른근육남',  emoji: '💪',   badge: '입문 1주차' },
  { id: 'u3', name: '프로틴좋아',    emoji: '🥛',   badge: '입문 3주차' },
];

const MY_POSTS = [
  {
    id: 'my1',
    title: '오늘 첫 헬스장 다녀왔어요 🎉',
    preview: '트레드밀 20분이랑 레그프레스 했어요. 생각보다 할 만했어요!',
    time: '방금',
    likes: 3,
    comments: 1,
  },
];

function Community() {
  const [activeTab, setActiveTab] = React.useState('main');
  const [following, setFollowing] = React.useState({});
  const [liked, setLiked] = React.useState({});
  const [showWrite, setShowWrite] = React.useState(false);

  const tabs = [
    { id: 'main',   label: '메인글' },
    { id: 'all',    label: '전체글' },
    { id: 'hot',    label: '인기글' },
    { id: 'follow', label: '팔로우' },
  ];

  const toggleFollow = (id) => setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleLike   = (id) => setLiked((prev)     => ({ ...prev, [id]: !prev[id] }));

  const recommended = COMMUNITY_POSTS.find((p) => p.isRecommended);
  const feedPosts   = COMMUNITY_POSTS.filter((p) => !p.isRecommended);

  const renderFeed = () => {
    if (activeTab === 'follow') {
      return (
        <div style={{ padding: '20px 18px', textAlign: 'center', color: '#A89BAE' }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🌱</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>아직 팔로우한 헬린이가 없어요</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.6 }}>추천 유저를 팔로우하면 여기에 글이 올라와요!</div>
        </div>
      );
    }
    if (activeTab === 'hot') {
      return [...feedPosts]
        .sort((a, b) => b.likes - a.likes)
        .map((post) => <PostRow key={post.id} post={post} liked={!!liked[post.id]} onLike={() => toggleLike(post.id)} />);
    }
    return feedPosts.map((post) => (
      <PostRow key={post.id} post={post} liked={!!liked[post.id]} onLike={() => toggleLike(post.id)} />
    ));
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', position: 'relative' }}>
      {/* header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F2ECF3', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '54px 18px 10px' }}>
          <button style={{ color: '#B7B1C0', marginRight: 2 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            background: '#F6F1F8', borderRadius: 12, padding: '9px 13px',
          }}>
            <Icon name="search" size={16} color="#B7B1C0" />
            <span style={{ fontSize: 13.5, color: '#B7B1C0', flex: 1 }}>1. 오늘의 운동</span>
            <span style={{
              background: 'var(--accent)', color: '#fff',
              fontSize: 10.5, fontWeight: 900, padding: '2px 7px', borderRadius: 99,
            }}>new</span>
          </div>
          <button style={{ color: '#B7B1C0' }}>
            <Icon name="bookmark" size={22} />
          </button>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex' }}>
          {tabs.map((tab) => {
            const on = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, padding: '10px 4px 9px', fontSize: 13.5,
                fontWeight: on ? 800 : 600,
                color: on ? 'var(--accent-deep)' : '#A89BAE',
                borderBottom: `2.5px solid ${on ? 'var(--accent-deep)' : 'transparent'}`,
                transition: 'all .15s',
              }}>{tab.label}</button>
            );
          })}
        </div>
      </div>

      {/* scrollable body */}
      <div className="tf-scroll" style={{ flex: 1, overflowY: 'auto' }}>
        {/* recommended post */}
        {(activeTab === 'main' || activeTab === 'all') && recommended && (
          <div style={{ padding: '16px 18px 4px' }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: '#A89BAE', marginBottom: 8, letterSpacing: 0.5 }}>
              추천 글
            </div>
            <RecommendedCard
              post={recommended}
              liked={!!liked[recommended.id]}
              onLike={() => toggleLike(recommended.id)}
            />
          </div>
        )}

        {/* feed */}
        <div style={{ padding: '4px 18px 8px' }}>
          {renderFeed()}
        </div>

        {/* recommended users */}
        {(activeTab === 'main' || activeTab === 'all') && (
          <div style={{ padding: '8px 18px 20px' }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: '#A89BAE', marginBottom: 12, letterSpacing: 0.5 }}>
              추천 유저
            </div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }} className="tf-scroll">
              {RECOMMENDED_USERS.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isFollowing={!!following[user.id]}
                  onFollow={() => toggleFollow(user.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* my recent post (main tab) */}
        {activeTab === 'main' && (
          <div style={{ padding: '0 18px 24px' }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: '#A89BAE', marginBottom: 10, letterSpacing: 0.5 }}>
              오늘 내 글
            </div>
            {MY_POSTS.map((post) => (
              <div key={post.id} style={{
                background: '#fff', borderRadius: 18, padding: '14px 16px',
                border: '1.5px solid #F4EEF4', boxShadow: '0 3px 10px rgba(80,60,90,0.04)',
              }}>
                <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>{post.title}</div>
                <div style={{ fontSize: 12.5, color: '#7C7689', lineHeight: 1.5 }}>{post.preview}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                  <span style={{ fontSize: 12, color: '#A89BAE' }}>❤️ {post.likes}</span>
                  <span style={{ fontSize: 12, color: '#A89BAE' }}>💬 {post.comments}</span>
                  <span style={{ fontSize: 12, color: '#A89BAE', marginLeft: 'auto' }}>{post.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: 20 }} />
      </div>

      {/* floating write button */}
      <button
        onClick={() => setShowWrite(true)}
        style={{
          position: 'absolute', right: 18, bottom: 18,
          width: 52, height: 52, borderRadius: 99,
          background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))',
          boxShadow: '0 8px 22px var(--accent-shadow)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 26, fontWeight: 300,
        }}
        aria-label="글 작성"
      >＋</button>

      {/* write modal */}
      {showWrite && <WriteModal onClose={() => setShowWrite(false)} />}
    </div>
  );
}

function RecommendedCard({ post, liked, onLike }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding: '16px 18px',
      border: '2px solid var(--accent)',
      boxShadow: '0 8px 24px var(--accent-shadow)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <AuthorAvatar author={post.author} emoji={post.authorAvatar} isCoach={post.isCoach} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--ink)' }}>{post.author}</span>
            {post.isCoach && <CoachBadge />}
          </div>
          <div style={{ fontSize: 11, color: '#A89BAE' }}>{post.time}</div>
        </div>
      </div>
      <div style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.4 }}>
        {post.title}
      </div>
      <div style={{ fontSize: 13, color: '#7C7689', lineHeight: 1.55, marginBottom: 12 }}>
        {post.preview}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onLike} style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 13, fontWeight: 700,
          color: liked ? '#E0496C' : '#A89BAE', transition: 'all .15s',
        }}>
          {liked ? '❤️' : '🤍'} {post.likes + (liked ? 1 : 0)}
        </button>
        <span style={{ fontSize: 13, color: '#A89BAE', display: 'flex', alignItems: 'center', gap: 4 }}>
          💬 {post.comments}
        </span>
        <span style={{
          marginLeft: 'auto', fontSize: 12, color: 'var(--accent-deep)',
          fontWeight: 800, background: 'var(--accent-bg)',
          padding: '4px 10px', borderRadius: 99,
        }}>추천 글</span>
      </div>
    </div>
  );
}

function PostRow({ post, liked, onLike }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 0', borderBottom: '1px solid #F2ECF3',
    }}>
      <AuthorAvatar author={post.author} emoji={post.authorAvatar} isCoach={post.isCoach} size={44} square />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{post.title}</div>
        <div style={{ fontSize: 12, color: '#A89BAE', display: 'flex', alignItems: 'center', gap: 4 }}>
          {post.author}
          {post.isCoach && <CoachBadge small />}
          · {post.time}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <button onClick={onLike} style={{
          display: 'flex', alignItems: 'center', gap: 3,
          background: liked ? '#FFE6EC' : 'var(--accent-bg)',
          color: liked ? '#E0496C' : 'var(--accent-deep)',
          fontSize: 12, fontWeight: 800, padding: '5px 10px', borderRadius: 99,
          transition: 'all .15s',
        }}>
          {liked ? '❤️' : '🤍'} {post.likes + (liked ? 1 : 0)}
        </button>
      </div>
    </div>
  );
}

function AuthorAvatar({ emoji, isCoach, size, square }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: square ? 14 : 99,
      background: 'var(--accent-bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.48, flexShrink: 0, position: 'relative',
    }}>
      {emoji}
      {isCoach && (
        <div style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 16, height: 16, background: '#3B82F6',
          borderRadius: 99, border: '2px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8, color: '#fff', fontWeight: 900,
        }}>✓</div>
      )}
    </div>
  );
}

function CoachBadge({ small }) {
  return (
    <span style={{
      fontSize: small ? 9.5 : 10.5, background: '#EEF2FF', color: '#3B82F6',
      fontWeight: 800, padding: small ? '1px 5px' : '1px 6px', borderRadius: 99,
    }}>코치</span>
  );
}

function UserCard({ user, isFollowing, onFollow }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      padding: '14px 14px 12px', background: '#fff', borderRadius: 20,
      border: '1.5px solid #F2ECF3', flexShrink: 0, width: 102, position: 'relative',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 99, background: 'var(--accent-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
      }}>{user.emoji}</div>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink)', textAlign: 'center', lineHeight: 1.3 }}>
        {user.name}
      </div>
      <div style={{ fontSize: 10.5, color: '#A89BAE', textAlign: 'center' }}>{user.badge}</div>
      <button onClick={onFollow} style={{
        padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 800,
        background: isFollowing ? '#F2EAF1' : 'var(--accent)',
        color: isFollowing ? '#A89BAE' : '#fff',
        transition: 'all .15s', marginTop: 2, width: '100%',
      }}>{isFollowing ? '팔로잉' : '팔로우'}</button>
    </div>
  );
}

function WriteModal({ onClose }) {
  const [text, setText] = React.useState('');
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'flex-end', zIndex: 50,
    }}>
      <div style={{
        width: '100%', background: '#fff', borderRadius: '24px 24px 0 0',
        padding: '20px 20px 36px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
          <div className="jua" style={{ flex: 1, fontSize: 18, color: 'var(--ink)' }}>헬린이 이야기 나누기</div>
          <button onClick={onClose} style={{ color: '#B7B1C0' }}><Icon name="close" size={22} /></button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="오늘 운동 어떠셨나요? 솔직하게 써도 괜찮아요 🌷"
          rows={4}
          style={{
            width: '100%', resize: 'none', border: '2px solid #F0E7F1',
            borderRadius: 16, padding: '13px 14px', fontSize: 14,
            fontFamily: "'Gothic A1', sans-serif", color: 'var(--ink)',
            outline: 'none', lineHeight: 1.6, background: '#FDFAFF',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={(e)  => (e.target.style.borderColor = '#F0E7F1')}
        />
        <div style={{ marginTop: 12 }}>
          <PrimaryButton
            onClick={() => { if (text.trim()) onClose(); }}
            disabled={!text.trim()}
          >
            게시하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

window.Community = Community;
