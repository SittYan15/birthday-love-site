import { siteConfig } from '../data'

export default function Hero() {
  return (
    <section className="hero section" id="home">
      <div className="hero-copy">
        <span className="eyebrow">အချစ်များဖြင့် ပြုလုပ်ထားသည်</span>
        <h1>Happy Birthday,<br/></h1>
        <h2><span>အာပူတူးလေး ❤️</span></h2>
        <p className="hero-message">{siteConfig.heroMessage}</p>
        <div className="hero-date">✨ {siteConfig.birthdayDate} ✨</div>
        <a className="primary-button" href="#reasons">Start our little story ↓</a>
      </div>
      <div className="hero-photo-wrap">
        <div className="hero-sparkle s1">✦</div>
        <div className="hero-sparkle s2">♡</div>
        <img className="hero-photo" src="public/photos/20260910_171058.jpg" alt="Ko Ko's Ka Lay Lay Photo" />
        <div className="photo-note">ချစ်ရသော ကလေးလေး ♡</div>
      </div>
    </section>
  )
}
