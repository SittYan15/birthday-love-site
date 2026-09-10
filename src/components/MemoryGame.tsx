import { useEffect, useMemo, useState } from 'react'

type Card = { id: number; value: string }
const symbols = ['❤️', '🌷', '🐻', '🍓', '🎂', '✨']

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
  }

  return (
    <section className="section game-section" id="game">
      <div className="section-heading">
        <span className="eyebrow">A tiny game for you</span>
        <h2>Match our cute little things</h2>
        <p>Find all six pairs. Your prize is extremely exclusive.</p>
      </div>
      <div className="game-shell">
        <div className="game-topbar"><span>Moves: <b>{moves}</b></span><button onClick={reset}>Shuffle ↻</button></div>
        <div className="memory-grid">
          {deck.map((card) => {
            const visible = flipped.includes(card.id) || matched.includes(card.value)
            return (
              <button className={`memory-card ${visible ? 'is-flipped' : ''} ${matched.includes(card.value) ? 'matched' : ''}`} key={card.id} onClick={() => choose(card)}>
                <span className="card-back">?</span>
                <span className="card-front">{card.value}</span>
              </button>
            )
          })}
        </div>
        {won && (
          <div className="win-card">
            <div className="win-sparkles" aria-hidden="true">{sparkle.map((i) => <span key={i}>✦</span>)}</div>
            <span className="win-emoji">🎉</span>
            <h3>You won!</h3>
            <p><b>Prize:</b> Unlimited hugs from me.</p>
            <small>Terms & conditions: cannot be refunded. Valid forever. ❤️</small>
          </div>
        )}
      </div>
    </section>
  )
}
