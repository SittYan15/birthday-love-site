import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

type Card = { id: number; value: string }
const symbols = ['❤️', '🌷', '🐻', '🍓', '🎂', '✨']

const prizes = [
  'Unlimited hugs & kisses from koko (ပြန်လဲလို့မရ, ကုန်ဆုံးရက် မရှိ 😌) 💕',
  '😮အထူးဆုကြီး!😮 (ကြိုက်တာနဲ့လာလဲလို့ရတယ်နော်၊ ပိုက်ဆံကလွဲလို့ 🤓) SS ရိုက်ပြီးလာပြ',
  'ကဲကဲ screenshot ရိုက်ပြီး ကို့စီ မုန့်ဖိုးလာထုတ်ပါ 💰',
]

function pickRandomPrize() {
  return prizes[Math.floor(Math.random() * prizes.length)]
}

function makeDeck(): Card[] {
  return [...symbols, ...symbols]
    .map((value, id) => ({ value, id }))
    .sort(() => Math.random() - 0.5)
}

export default function MemoryGame() {
  const [deck, setDeck] = useState<Card[]>(() => makeDeck())
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [showWinPopup, setShowWinPopup] = useState(false)
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null)
  const locked = flipped.length === 2
  const won = matched.length === symbols.length
  const sparkle = useMemo(() => Array.from({ length: 12 }, (_, i) => i), [])

  useEffect(() => {
    if (flipped.length !== 2) return

    const [first, second] = flipped
    const firstValue = deck.find((card) => card.id === first)?.value
    const secondValue = deck.find((card) => card.id === second)?.value

    if (firstValue && firstValue === secondValue) {
      setMatched((prev) => [...prev, firstValue])
      setFlipped([])
    } else {
      const timer = setTimeout(() => setFlipped([]), 750)
      return () => clearTimeout(timer)
    }
  }, [flipped, deck])

  useEffect(() => {
    if (!won || selectedPrize !== null) return

    setSelectedPrize(pickRandomPrize())
    setShowWinPopup(true)
  }, [won, selectedPrize])

  useEffect(() => {
    if (!showWinPopup) return

    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowWinPopup(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = oldOverflow
    }
  }, [showWinPopup])

  const choose = (card: Card) => {
    if (locked || flipped.includes(card.id) || matched.includes(card.value)) return

    setFlipped((prev) => [...prev, card.id])
    if (flipped.length === 0) setMoves((m) => m + 1)
  }

  const reset = () => {
    setDeck(makeDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setShowWinPopup(false)
    setSelectedPrize(null)
  }

  const winnerPopup = showWinPopup
    ? createPortal(
        <div
          className="win-popup-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowWinPopup(false)
          }}
        >
          <div
            className="win-popup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-win-title"
          >
            <div className="win-sparkles" aria-hidden="true">
              {sparkle.map((i) => <span key={i}>✦</span>)}
            </div>

            <button
              className="win-popup-close"
              type="button"
              aria-label="Close winner popup"
              onClick={() => setShowWinPopup(false)}
            >
              ×
            </button>

            <span className="win-popup-emoji" aria-hidden="true">🎉</span>
            <span className="eyebrow">You found every pair!</span>
            <h4 id="memory-win-title">နိုင်သွားပါပြီ! ❤️</h4>

            <div className="win-popup-prize">
              <span>🎁</span>
              <strong>{selectedPrize ?? 'A surprise from me ❤️'}</strong>
            </div>

            <div className="win-popup-actions">
              <button className="primary-button" type="button" onClick={reset}>
                Play again ↻
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setShowWinPopup(false)}
              >
                Claim my prize ❤️
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <section className="section game-section" id="game">
        <div className="section-heading">
          <span className="eyebrow">A tiny game for you</span>
          <h2 style={{lineHeight: 1.5}}>cards တွေမှာပါတဲ့ အရုပ် ၂ ခု တူတာရှာ</h2>
          <br/>
          <p>၆ စုံ ပြည့်အောင်ရှာနိုင်ရင်၊ အထူးဆုကြီးတွေရှိတယ်နော်!</p>
        </div>

        <div className="game-shell">
          <div className="game-topbar">
            <span>Moves: <b>{moves}</b></span>
            <button onClick={reset}>Shuffle ↻</button>
          </div>

          <div className="memory-grid">
            {deck.map((card) => {
              const visible = flipped.includes(card.id) || matched.includes(card.value)
              const isMatched = matched.includes(card.value)

              return (
                <button
                  className={`memory-card ${visible ? 'is-flipped' : ''} ${isMatched ? 'matched' : ''}`}
                  key={card.id}
                  onClick={() => choose(card)}
                  aria-label={visible ? `Card ${card.value}` : 'Hidden memory card'}
                >
                  <span className="card-back">?</span>
                  <span className="card-front">{card.value}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {winnerPopup}
    </>
  )
}
