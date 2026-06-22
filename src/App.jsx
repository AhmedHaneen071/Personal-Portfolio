import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import GitHubProjects from './components/GitHubProjects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'

function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'light' ? 'light' : 'dark'
  })

  const onSplashFinish = useCallback(() => setSplashDone(true), [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
  }

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [theme])

  useEffect(() => {
    const handleAnchor = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }

    document.addEventListener('click', handleAnchor)
    return () => document.removeEventListener('click', handleAnchor)
  }, [])

  return (
    <>
      {!splashDone && <SplashScreen onFinish={onSplashFinish} />}
      <Navbar toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <GitHubProjects />
      <Contact />
      <Footer />
    </>
  )
}

export default App
