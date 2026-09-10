import { timeline } from '../data'

export default function Timeline() {
  return (
    <section className="section timeline-section" id="timeline">
      <div className="section-heading">
        <span className="eyebrow">How we got here</span>
        <h2>Our little timeline</h2>
      </div>
      <div className="timeline">
        {timeline.map((item, index) => (
          <article className="timeline-item" key={item.title}>
            <div className="timeline-dot">{index + 1}</div>
            <div className="timeline-card">
              <img src={item.image} alt="Memory placeholder" />
              <div>
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
