import { useState, useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    requestAnimationFrame(() => {
      setPhase('show')
    })

    const t1 = setTimeout(() => {
      setPhase('exit')
    }, 1500)

    const t2 = setTimeout(() => {
      onFinish()
    }, 2100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onFinish])

  return (
    <div className={`splash ${phase}`}>
      <div className="splash-content">
        <span className="splash-hello">Hello</span>
      </div>
    </div>
  )
}
