import { useMemo } from 'react'
import { siteConfig } from '../data'

type OpeningProps = { onOpen: () => void }

export default function Opening({ onOpen }: OpeningProps) {
  const hearts = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    delay: `${(i % 6) * 0.65}s`,
    duration: `${7 + (i % 5)}s`,
    size: `${14 + (i % 5) * 4}px`,
  })), [])

  return (
    <div className="opening-screen">
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            style={{ left: heart.left, animationDelay: heart.delay, animationDuration: heart.duration, fontSize: heart.size }}
          >♥</span>
        ))}
      </div>
      <div className="opening-card">
        <span className="eyebrow">ကို့ကလေးလေးအတွတ်</span>
        <div className="opening-icon">🎂</div>
        <h1>Happy Birthday,</h1>
        <h2>{siteConfig.herName} ❤️</h2>
        <p>အမှတ်တရတွေအပြည့်ပါတဲ့ အရာလေးတစ်ခုကို ကို့ကလေးလေးအတွတ် လုပ်ပေးထားတယ်နော် ❤️</p>
        <button className="primary-button glow" onClick={onOpen}>Open your birthday surprise ✨</button>
      </div>
    </div>
  )
}
