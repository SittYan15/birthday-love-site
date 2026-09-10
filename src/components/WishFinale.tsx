import { useMemo, useState } from 'react'

type Phase = 'ready' | 'wishing' | 'celebrated'

const WISH_STORAGE_KEY = 'birthday-wish-made-v1'

function hasAlreadyMadeWish() {
  try {
    return localStorage.getItem(WISH_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export default function WishFinale() {
  const [phase, setPhase] = useState<Phase>(() => hasAlreadyMadeWish() ? 'celebrated' : 'ready')
  const [justCelebrated, setJustCelebrated] = useState(false)
  const confetti = useMemo(() => Array.from({ length: 44 }, (_, index) => index), [])

  const celebrate = () => {
    try {
      localStorage.setItem(WISH_STORAGE_KEY, 'true')
    } catch {
      // If storage is unavailable, still complete the wish for this session.
    }

    setJustCelebrated(true)
    setPhase('celebrated')
    if ('vibrate' in navigator) navigator.vibrate?.([80, 45, 120])
  }

  return (
    <section className={`wish-finale ${justCelebrated ? 'is-celebrating' : ''}`} id="wish">
      <style>{`
        .wish-finale{position:relative;width:min(980px,calc(100% - 32px));margin:0 auto 70px;padding:clamp(56px,8vw,86px) clamp(22px,6vw,68px);overflow:hidden;text-align:center;border-radius:42px;background:radial-gradient(circle at 50% 15%,#423047 0,#251d31 48%,#17131f 100%);color:#fff;box-shadow:0 32px 80px rgba(52,34,59,.25)}
        .wish-finale::before{content:'✦  ·  ✧   ·   ✦  ·  ✧   ·   ✦';position:absolute;inset:24px 0 auto;color:rgba(255,235,246,.35);font-size:clamp(16px,4vw,28px);letter-spacing:1.5vw;white-space:nowrap;animation:wishTwinkle 2.2s ease-in-out infinite alternate}
        .wish-finale-content{position:relative;z-index:3;max-width:680px;margin:auto}
        .wish-finale .wish-eyebrow{display:inline-block;color:#ffd8e3;font-size:.72rem;text-transform:uppercase;letter-spacing:.18em;font-weight:800}
        .wish-finale h2{font-family:Georgia,serif;font-size:clamp(38px,7vw,68px);line-height:1.02;margin:12px 0 16px}
        .wish-finale p{color:#eadde6;line-height:1.75;margin:0 auto 28px;max-width:570px}
        .wish-button{border:0;border-radius:999px;padding:14px 24px;background:linear-gradient(135deg,#f58aa1,#d85f7b);color:#fff;font-weight:800;cursor:pointer;box-shadow:0 14px 34px rgba(216,95,123,.34);transition:.2s ease}
        .wish-button:hover{transform:translateY(-2px) scale(1.02)}
        .wish-stage{display:grid;place-items:center;gap:18px;margin-top:16px}
        .cake{position:relative;width:190px;height:178px;margin:10px auto 2px}
        .cake-plate{position:absolute;left:0;right:0;bottom:0;height:18px;border-radius:50%;background:#d9c3d5;box-shadow:0 8px 20px rgba(0,0,0,.25)}
        .cake-layer{position:absolute;left:20px;right:20px;bottom:16px;height:90px;border-radius:18px 18px 12px 12px;background:linear-gradient(#ffc5d2,#f190aa);box-shadow:inset 0 -12px 0 rgba(193,75,105,.12)}
        .cake-layer::before{content:'';position:absolute;inset:0 0 auto;height:25px;border-radius:18px 18px 45% 45%;background:#fff4f7;box-shadow:0 8px 0 -3px #fff4f7}
        .cake-sprinkles{position:absolute;left:36px;right:36px;bottom:42px;font-size:16px;letter-spacing:9px;color:#fff2a8;z-index:3}
        .candle{position:absolute;left:50%;bottom:103px;transform:translateX(-50%);width:14px;height:48px;border-radius:8px 8px 3px 3px;background:repeating-linear-gradient(135deg,#fff 0 7px,#f27495 7px 14px);z-index:4}
        .flame-button{position:absolute;left:50%;bottom:147px;transform:translateX(-50%);width:48px;height:56px;border:0;background:transparent;cursor:pointer;z-index:6;padding:0}
        .flame{display:block;width:26px;height:36px;margin:auto;border-radius:50% 50% 48% 48%;background:radial-gradient(circle at 50% 68%,#fff7a8 0 21%,#ffc349 22% 54%,#ff7b45 55% 100%);filter:drop-shadow(0 0 12px rgba(255,180,63,.9));transform-origin:50% 100%;animation:wishFlame .75s ease-in-out infinite alternate}
        .flame-button:hover .flame{transform:scale(1.12)}
        .wish-instruction{font-size:.88rem!important;color:#f5cbd8!important;margin:0!important}
        .wish-done-heart{font-size:62px;animation:wishPop .65s cubic-bezier(.2,1.4,.4,1) both}
        .wish-result{font-family:Georgia,serif;font-size:clamp(26px,5vw,40px);margin:4px 0 8px;color:#fff}
        .wish-confetti{position:absolute;top:-30px;z-index:2;font-size:18px;animation:wishFall 3.4s linear infinite;pointer-events:none}
        @keyframes wishFlame{from{transform:rotate(-4deg) scaleY(.95)}to{transform:rotate(4deg) scaleY(1.08)}}
        @keyframes wishTwinkle{to{opacity:.45;transform:scale(1.01)}}
        @keyframes wishFall{to{transform:translateY(720px) rotate(520deg);opacity:.1}}
        @keyframes wishPop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
        @media(max-width:640px){.wish-finale{width:calc(100% - 24px);border-radius:28px;margin-bottom:48px}.cake{transform:scale(.9);margin-top:0}}
      `}</style>

      {justCelebrated && confetti.map((item) => (
        <span
          key={item}
          className="wish-confetti"
          style={{
            left: `${(item * 37) % 100}%`,
            animationDelay: `${(item % 11) * 0.12}s`,
            animationDuration: `${2.6 + (item % 5) * 0.35}s`,
          }}
          aria-hidden="true"
        >
          {item % 3 === 0 ? '💗' : item % 3 === 1 ? '✦' : '🌸'}
        </span>
      ))}

      <div className="wish-finale-content">
        <span className="wish-eyebrow">One last little moment</span>

        {phase === 'ready' && (
          <>
            <h3>✨ မွေးနေ့မှာ ဆုတစ်ခုတောင်းလိုက်ပါ ✨</h3>
            <p>🤗 မျက်လုံးကို တစ်စက္ကန့်လောက်မှိတ်ပြီး၊ တစ်ကယ်တန်းဖြစ်ချင်ကို စဉ်းစားပြီးမှ ဆုတောင်းနော် 😘</p>
            <button type="button" className="wish-button" onClick={() => setPhase('wishing')}>
              I’m ready to make a wish 💫
            </button>
          </>
        )}

        {phase === 'wishing' && (
          <>
            <h3>အဆင်သင့်ပဲပေါ့? 🎂</h3>
            <p>အခုဆုတောင်းလို့ရပါပြီ… ပြီးရင် ဖယောင်းတိုင်မှုတ်ပြီး မီးငြိမ်းဖို့အတွတ် မီးတောက်လေးကို ထိလိုက်ပါ</p>
            <div className="wish-stage">
              <div className="cake" aria-label="Birthday cake with one candle">
                <div className="cake-plate" />
                <div className="cake-layer" />
                <div className="cake-sprinkles">• • • • •</div>
                <div className="candle" />
                <button type="button" className="flame-button" onClick={celebrate} aria-label="Blow out the candle">
                  <span className="flame" />
                </button>
              </div>
              <p className="wish-instruction">☝️ Tap the flame to blow it out</p>
            </div>
          </>
        )}

        {phase === 'celebrated' && (
          <>
            <div className="wish-done-heart">💖</div>
            <h3 className="wish-result">ဆုတောင်းလို့ပြီးသွားပါပြီ!</h3>
            <p>
              ကို့ကလေးလေး ဆုတောင်းသမျှတွေ အကောင်အထည်ပေါ်လာပါစေ။<br />
              Happy Birthday, ကို့ရဲ့ အာပူတူးလေး.. 🎂❤️
            </p>
            <p className="wish-instruction">
              ဒီမွေးနေ့အတွက် ဆုတောင်းတစ်ခုပဲနော် 💫 Your wish is safely kept. ❤️
            </p>
          </>
        )}
      </div>
    </section>
  )
}
