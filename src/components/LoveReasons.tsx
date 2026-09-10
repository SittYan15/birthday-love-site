import { useState } from 'react'
import { loveReasons } from '../data'

export default function LoveReasons() {
  const [revealed, setRevealed] = useState<number[]>([])
  const reveal = (index: number) => {
    if (!revealed.includes(index)) setRevealed([...revealed, index])
  }

  return (
    <section className="section" id="reasons">
      <div className="section-heading">
        <span className="eyebrow">ကိုကို ချစ်ကို အကြီးကြီး</span>
        <br />
        <h2>ချစ်ရတဲ့ အကြောင်းအရင်း</h2>
        <br />
        <p>တစ်ကဒ်ချင်းစီကို ထိပြီးကြည့်၊ ဒီလိုမျိုးလေး အခု ၁၀၀ မက လုပ်လိုက်လို့တောင်ရတယ်နော်</p>
      </div>
      <div className="reason-grid">
        {loveReasons.map((reason, index) => {
          const isOpen = revealed.includes(index)
          return (
            <button className={`reason-card ${isOpen ? 'revealed' : ''}`} key={reason.title} onClick={() => reveal(index)}>
              <span className="reason-icon">{isOpen ? reason.icon : '💗'}</span>
              <h3>{isOpen ? reason.title : 'Tap to reveal'}</h3>
              <p>{isOpen ? reason.text : 'A tiny reason is hiding here...'}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
