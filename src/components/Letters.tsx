import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { letters } from '../data'

export default function Letters() {
  const [openLetter, setOpenLetter] = useState<number | null>(null)

  useEffect(() => {
    if (openLetter === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenLetter(null)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openLetter])

  const letterModal = openLetter !== null
    ? createPortal(
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="open-letter-title"
          onClick={() => setOpenLetter(null)}
        >
          <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              type="button"
              aria-label="Close letter"
              onClick={() => setOpenLetter(null)}
            >
              ×
            </button>
            <div className="letter-paper">
              <span className="letter-big-icon">{letters[openLetter].icon}</span>
              <p style={{fontSize:20}}>{letters[openLetter].body}</p>
              <div className="letter-sign">ကိုကို ❤️</div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <section className="section letters-section" id="letters">
        <div className="section-heading">
          <span className="eyebrow">A few words for later</span>
          <h2>Open when... 💌</h2>
          <p>ကို့ကလေးလေးအတွတ် သီးသန့် ... 😙</p>
        </div>
        <div className="letter-grid">
          {letters.map((letter, index) => (
            <button
              className="envelope"
              key={letter.title}
              type="button"
              onClick={() => setOpenLetter(index)}
            >
              <span className="envelope-flap"></span>
              <span className="envelope-icon">{letter.icon}</span>
              <span>{letter.title}</span>
            </button>
          ))}
        </div>
      </section>

      {letterModal}
    </>
  )
}
