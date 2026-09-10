import { useState } from 'react'
import { siteConfig } from '../data'

export default function FinalLetter() {
  const [secret, setSecret] = useState(false)
  return (
    <section className="section final-section" id="final">
      <div className="final-card">
        <span className="eyebrow">And finally...</span>
        <h2>Happy Birthday, my love. ❤️</h2>
        <p>
          ဒီနှစ်မှာလဲ အစစအရာရာ အကုန်အဆင်ပြေပါစေလို့ ကိုကိုဆုတောင်းပေးပါတယ်နော်။
          ကိုကိုအကြီးကြီးချစ်တယ်ဆိုတာကို ကိုကိုသိပြီးသားပါပဲ။ အခုလို အချစ်နဲ့ ပြည့်နေတဲ့နေ့မှာ ကိုကိုအတွက် အရမ်းအရမ်းပျော်ရွှင်စရာကောင်းတဲ့နေ့ဖြစ်ပါစေလို့ ဆုတောင်းပေးပါတယ်။
          အာပူတူးလေး
          I hope this year brings you the happiness you deserve. Thank you for being part of my life,
          for listening to me, laughing with me, supporting me, and creating all these memories with me.
        </p>
        <p>
          I do not know exactly what every future day will look like, but I hope there will be many more
          birthdays where I get to tell you how grateful I am that you are here.
        </p>
        <p className="final-emphasis">Keep smiling, keep dreaming, and never forget how loved you are.</p>
        <div className="signature">With all my love,<br/><strong>{siteConfig.yourName}</strong> ❤️</div>
        <button className="secret-heart" onClick={() => setSecret(true)} aria-label="Secret surprise">♥</button>
        <small className="secret-hint">psst... there might be one tiny secret here</small>
      </div>
      {secret && (
        <div className="modal-backdrop celebration" onClick={() => setSecret(false)}>
          {Array.from({ length: 32 }).map((_, i) => <span className={`confetti c-${i % 8}`} key={i} style={{ left: `${(i * 23) % 100}%`, animationDelay: `${(i % 10) * .08}s` }}>♥</span>)}
          <div className="secret-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSecret(false)}>×</button>
            <div className="secret-big-heart">❤️</div>
            <h3>You found it!</h3>
            <p>I love you more than this website can probably express.</p>
            <span>And yes, I would still choose you. Every time. ✨</span>
          </div>
        </div>
      )}
    </section>
  )
}
