import { useState } from 'react'
import { siteConfig } from '../data'

export default function FinalLetter() {
  const [secret, setSecret] = useState(false)
  return (
    <section className="section final-section" id="final">
      <div className="final-card">
        <span className="eyebrow">And finally...</span>
        <h2>Happy Birthday,</h2>
        <h3>ကို့ရဲ့ အာပူတူးလေး. ❤️</h3>
        <p>
          ဘာလိုလိုနဲ့ နောက်ထပ် တစ်နှစ်တောင် ထပ်ကြီးသွားပြန်ပြီနော်။
          ဒီနေ့ကစပြီး လာမဲ့ နှစ်ပေါင်းများစွာ အစစ အရာရာ အကုန်အဆင်ပြေပါစေလို့ ကိုကိုထပ်မံဆုတောင်းပေးပါတယ်။
        </p>
        <p>
          ဒီနှစ်လဲ ကိုကို ချစ်ဘေးနားမှာ မရှိနိုင်လို့လဲ ကိုကိုတောင်းပန်ပါတယ်ကွယ်။
          အမြန်ဆုံးနိးစပ်အောင်လဲ ကိုကို အကောင်းဆုံးကြိုးစားနေပါတယ် အာပူတူးလေး။
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
