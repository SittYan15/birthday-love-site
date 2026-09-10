import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gallery } from '../data'

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    if (selected === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected])

  const photoModal = selected !== null
    ? createPortal(
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={gallery[selected].caption}
          onClick={() => setSelected(null)}
        >
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              type="button"
              aria-label="Close photo"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <img src={gallery[selected].src} alt={gallery[selected].caption} />
            <p>{gallery[selected].caption}</p>
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <section className="section" id="gallery">
        <div className="section-heading">
          <span className="eyebrow">အမှတ်တရများ</span>
          <h2>ကို့ရင်ထဲက ချစ်ရဲ့ ပုံရိပ်များ</h2>
        </div>
        <div className="polaroid-grid">
          {gallery.map((photo, index) => (
            <button
              className={`polaroid tilt-${(index % 4) + 1}`}
              key={photo.src}
              type="button"
              onClick={() => setSelected(index)}
            >
              <img src={photo.src} alt={photo.caption} />
              <span style={{ fontSize:15 }} >{photo.caption}</span>
            </button>
          ))}
        </div>
      </section>

      {photoModal}
    </>
  )
}
