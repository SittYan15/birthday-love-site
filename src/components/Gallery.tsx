import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gallery } from '../data'

function isVideo(src: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(src)
}

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    if (selected === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected])

  const selectedItem =
    selected !== null ? gallery[selected] : null

  const mediaModal =
    selectedItem !== null
      ? createPortal(
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.caption}
            onClick={() => setSelected(null)}
          >
            <div
              className="photo-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                type="button"
                aria-label="Close media"
                onClick={() => setSelected(null)}
              >
                ×
              </button>

              {isVideo(selectedItem.src) ? (
                <video
                  className="gallery-modal-video"
                  src={selectedItem.src}
                  controls
                  autoPlay
                  playsInline
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.caption}
                />
              )}

              <p>{selectedItem.caption}</p>
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
          {gallery.map((item, index) => {
            const video = isVideo(item.src)

            return (
              <button
                className={`polaroid tilt-${(index % 4) + 1}`}
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                aria-label={
                  video
                    ? `Play video: ${item.caption}`
                    : `View photo: ${item.caption}`
                }
              >
                {video ? (
                  <>
                    <video
                      src={item.src}
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="video-badge">▶</div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.caption}
                  />
                )}

                <span style={{ fontSize: 15 }}>
                  {item.caption}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {mediaModal}
    </>
  )
}