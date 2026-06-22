import { useState, useEffect } from 'react'

export default function Navbar({ toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-inner">
        <a href="#home" className="logo" onClick={closeMenu}>AH<span>.</span></a>
        <ul id="menuList" className={menuOpen ? 'open' : ''}>
          <li><a href="#home" onClick={closeMenu}>Home</a></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#github" onClick={closeMenu}>Work</a></li>
          <li><a href="#github" onClick={closeMenu}>GitHub</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button id="themeBtn" onClick={toggleTheme} aria-label="Toggle theme">
            <i className="fa-solid fa-moon"></i>
            <i className="fa-solid fa-sun"></i>
          </button>
          <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  )
}
