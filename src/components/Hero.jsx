export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-tag">Designer &amp; Developer</div>
        <h1>Ahmed<br /><span>Haneen</span></h1>
        <p>Creating compelling digital experiences through design and code.</p>
        <div className="hero-actions">
          <a href="#github" className="btn btn-primary">View Work</a>
          <a href="#contact" className="btn btn-outline">Get in Touch</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span></span>
      </div>
    </section>
  )
}
