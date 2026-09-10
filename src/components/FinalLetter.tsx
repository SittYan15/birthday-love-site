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
          ဒီနေ့ကစပြီး လာမဲ့နှစ်ပေါင်းများစွာ အစစအရာရာ အကုန်အဆင်ပြေပါစေလို့ ကိုကိုတောင်းပေးပါတယ်။ 😘
          အကြံအစည်တွေ အကောင်အထည်ဖော်တဲ့အခါလဲ အကုန်လုံးအဆင်ပြေ ချောချောမွေ့မွေ့ အောင်မြင် ပါစေကွယ်။ ❤️
          <br />
          ဒီနှစ်မွေးနေ့မှာလဲ ကိုကို ချစ်ဘေးနား မရှိနိုင်သေးလို့ စိတ်မကောင်းမဖြစ်ပါနဲ့နော် အာပူတူးလေး။ <br /> ပြန်တွေ့ရမဲ့ ရက်ကလဲ တစ်ရက်ပြီး တစ်ရက်နီးနေပါပြီကွယ်။
        </p>
        <p>
          ❤️ ဒီနှစ်အတွတ် မွေးနေ့လက်ဆောင်ကတော့ ချစ်ဘေးနားမှာ အမြဲတမ်း ချစ်လိုတိုင်း ရှိနေမှာ၊
          တစ်ကမ္ဘာလုံးနဲ့ရန်ဖြစ်ရရင်တောင် ကိုက ချစ်ဘက်မှာပဲ ရပ်တည်ပေးနေမှာ။ ❤️
          <br />
          ပြီးတော့ အမြန်ဆုံးနိးစပ်အောင်လဲ ကိုကို အကောင်းဆုံးကြိုးစားနေပါတယ်နော်။
        </p>
        <p className="final-emphasis">နှစ်ယောက်အတူတူ စိတ်ကူးထားတဲ့ အိပ်မက်တွေလဲ ဖြစ်လာဖို့ နီးစပ်နေပါပြီနော်။</p>
        <div className="signature">အချစ်များစွာဖြင့်,<br/>❤️ <strong>{siteConfig.yourName}</strong> ❤️</div>
        <button className="secret-heart" onClick={() => setSecret(true)} aria-label="Secret surprise">♥</button>
        <small className="secret-hint">ရှူး.... ပြောချင်တဲ့ လျှို့ဝှက်ချက်တွေ ရှိသေးတယ်နော်၊ သိချင် CB လာခဲ့ 😁</small>
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
