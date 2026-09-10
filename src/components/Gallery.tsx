import { useState } from 'react'
import { gallery } from '../data'

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <section className="section" id="gallery">
      <div className="section-heading">
        <span className="eyebrow">Camera roll favorites</span>
        <h2>Little pieces of us</h2>
        <p>Click a photo to make the memory a little bigger.</p>
      </div>
      <div className="polaroid-grid">
        {gallery.map((photo, index) => (
          <button className={`polaroid tilt-${(index % 4) + 1}`} key={photo.src} onClick={() => setSelected(index)}>
            <img src={photo.src} alt={photo.caption} />
            <span>{photo.caption}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <img src={gallery[selected].src} alt={gallery[selected].caption} />
            <p>{gallery[selected].caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}
