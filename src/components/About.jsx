import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const els = document.querySelectorAll('.about-header, .about-bio, .resume-section')
    els.forEach((el) => {
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-header">
          <div className="section-label">About Me</div>
          <h2>Ahmed <span>Haneen</span></h2>
          <p className="about-title">Full-Stack Developer | Graphic Designer</p>
          <div className="contact-info">
            <span><i className="fa-solid fa-location-dot"></i> Hyderabad, Pakistan</span>
            <span><i className="fa-solid fa-phone"></i> 03253019374</span>
            <span><i className="fa-solid fa-phone"></i> 03399000731</span>
            <span><i className="fa-solid fa-envelope"></i> shaikhhaneen18@gmail.com</span>
            <span><i className="fa-brands fa-github"></i> <a href="https://github.com/AhmedHaneen071" target="_blank">GitHub Profile</a></span>
            <span><i className="fa-solid fa-globe"></i> <a href="https://portfolio-haneen-2026.web.app/" target="_blank">Portfolio Site</a></span>
          </div>
        </div>

        <div className="about-bio">
          <p>Creative and logic-driven professional with over 3 years of experience in Graphic Design and growing expertise in Software Engineering. Dedicated to creating compelling digital experiences by combining aesthetic design with scalable backend logic.</p>
        </div>

        <div className="resume-section">
          <h3>Technical Skills</h3>
          <div className="skills-group">
            <div className="skill-category">
              <h4>Web Development</h4>
              <div className="skills">
                <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>TypeScript</span><span>ASP.NET</span><span>Python</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Design &amp; UI/UX</h4>
              <div className="skills">
                <span>Graphic Design</span><span>UI/UX</span><span>Adobe Illustrator</span><span>Adobe Photoshop</span>
              </div>
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Work Experience</h3>
          <div className="experience-item">
            <div className="exp-header">
              <h4>Newway Packages</h4>
              <span className="exp-role">Graphic Designer</span>
              <span className="exp-date">2023 – Present</span>
            </div>
            <ul>
              <li>Developed packaging designs for diverse product categories.</li>
              <li>Ensured print-ready artwork aligned with client specifications.</li>
              <li>Collaborated with production team to maintain quality standards.</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h4>SMS Industries</h4>
              <span className="exp-role">Graphic Designer</span>
              <span className="exp-date">2019 – 2022</span>
            </div>
            <ul>
              <li>Designed branding materials and industrial marketing collateral.</li>
              <li>Managed multiple design projects from concept to final delivery.</li>
              <li>Created catalogs, brochures, and promotional materials.</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h4>AAR Printers</h4>
              <span className="exp-role">Graphic Designer <span className="exp-badge">Part Time</span></span>
              <span className="exp-date">2020 – 2022</span>
            </div>
            <ul>
              <li>Prepared print-ready files for commercial printing projects.</li>
              <li>Assisted with layout design and client revisions.</li>
              <li>Maintained brand consistency across print materials.</li>
            </ul>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h4>Tryfry Restaurant</h4>
              <span className="exp-role">Graphic Designer</span>
              <span className="exp-date">2019 – 2020</span>
            </div>
            <ul>
              <li>Designed menus, flyers, and promotional materials.</li>
              <li>Created social media graphics for marketing campaigns.</li>
              <li>Developed visual content to enhance brand presence.</li>
            </ul>
          </div>
        </div>

        <div className="resume-section">
          <h3>Education</h3>
          <div className="experience-item">
            <div className="exp-header">
              <h4>Hyderabad Institute of Tech &amp; MGT</h4>
              <span className="exp-role">Undergraduate Program — Current</span>
            </div>
          </div>
          <div className="experience-item">
            <div className="exp-header">
              <h4>Aptech Defence</h4>
              <span className="exp-role">Software Engineering</span>
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Interests</h3>
          <div className="skills">
            <span>Cricket</span><span>Football</span><span>PC Gaming</span>
          </div>
        </div>
      </div>
    </section>
  )
}
