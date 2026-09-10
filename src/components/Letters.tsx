import { useState } from 'react'
import { letters } from '../data'

export default function Letters() {
  const [openLetter, setOpenLetter] = useState<number | null>(null)
  return (
    <section className="section letters-section" id="letters">
      <div className="section-heading">
        <span className="eyebrow">A few words for later</span>
        <h2>Open when... 💌</h2>
        <p>Some messages are best saved for the exact moment you need them.</p>
      </div>
      <div className="letter-grid">
        {letters.map((letter, index) => (
          <button className="envelope" key={letter.title} onClick={() => setOpenLetter(index)}>
            <span className="envelope-flap"></span>
            <span className="envelope-icon">{letter.icon}</span>
            <span>{letter.title}</span>
          </button>
        ))}
      </div>
      {openLetter !== null && (
        <div className="modal-backdrop" onClick={() => setOpenLetter(null)}>
          <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenLetter(null)}>×</button>
            <div className="letter-paper">
              <span className="letter-big-icon">{letters[openLetter].icon}</span>
              <h3>{letters[openLetter].title}</h3>
              <p>{letters[openLetter].body}</p>
              <div className="letter-sign">Always yours ❤️</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
