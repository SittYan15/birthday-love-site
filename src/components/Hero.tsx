import { siteConfig } from '../data'

export default function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="hero-copy">
        <span className="eyebrow">Made with lots of love</span>
        <h1>Happy Birthday,<br/><span>{siteConfig.herName} ❤️</span></h1>
        <p className="hero-message">{siteConfig.heroMessage}</p>
        <div className="hero-date">✨ {siteConfig.birthdayDate} ✨</div>
        <a className="primary-button" href="#reasons">Start our little story ↓</a>
      </div>
      <div className="hero-photo-wrap">
        <div className="hero-sparkle s1">✦</div>
        <div className="hero-sparkle s2">♡</div>
        <img className="hero-photo" src="/photos/hero.svg" alt="Replace this with your favorite couple photo" />
        <div className="photo-note">my favorite person ♡</div>
      </div>
    </section>
  )
}
