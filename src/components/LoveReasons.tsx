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
        <span className="eyebrow">For the record</span>
        <h2>Things I love about you</h2>
        <p>Tap each little card. I could probably make a hundred of these.</p>
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
