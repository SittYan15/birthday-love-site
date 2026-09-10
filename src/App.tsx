import { useState } from 'react'
import Opening from './components/Opening'
import Hero from './components/Hero'
import LoveReasons from './components/LoveReasons'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Letters from './components/Letters'
import MemoryGame from './components/MemoryGame'
import FinalLetter from './components/FinalLetter'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [showBurst, setShowBurst] = useState(false)

  const openSite = () => {
    setShowBurst(true)
    setTimeout(() => setOpened(true), 450)
  }

  return (
    <>
      {!opened && <Opening onOpen={openSite} />}
      {showBurst && !opened && <div className="opening-burst">❤️</div>}
      <main className={opened ? 'site-visible' : 'site-hidden'}>
        <nav className="top-nav">
          <a className="brand" href="#home">♡ for chit</a>
          <div>
            <a href="#timeline">Story</a>
            <a href="#gallery">Photos</a>
            <a href="#letters">Letters</a>
            <a href="#game">Game</a>
          </div>
        </nav>
        <Hero />
        <LoveReasons />
        <Timeline />
        <Gallery />
        <Letters />
        <MemoryGame />
        <FinalLetter />
        <footer>Made with way too many hearts ❤️</footer>
      </main>
    </>
  )
}
