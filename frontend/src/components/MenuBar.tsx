import { useEffect, useState } from 'react'
import type { Side } from '../types'
import { usePlayer } from '../player/PlayerContext'

export function MenuBar({ side, onSide, live }: { side: Side; onSide: (s: Side) => void; live: boolean | null }) {
  const [now, setNow] = useState(() => new Date())
  const { current, playing } = usePlayer()

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  const clock = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })

  return (
    <nav className="menubar">
      <a className="menubar-brand" href="#top">
        <Glass /> <span className="brand-name">drunkonmartini<span className="dim">.os</span></span>
      </a>
      <div className="menubar-items">
        <button className={side === 'a' ? 'on' : ''} onClick={() => onSide('a')}>Lado A</button>
        <button className={side === 'b' ? 'on' : ''} onClick={() => onSide('b')}>Lado B</button>
        <a href="#escena">Escena</a>
        <a href="#contacto">Contacto</a>
      </div>
      <div className="menubar-status">
        {playing && current && <span className="np">♪ {current.title}</span>}
        {live === false && <span className="dim" title="Rails no responde: mostrando datos locales">api·offline</span>}
        <span className="pixel">{clock}</span>
      </div>
    </nav>
  )
}

export function Glass() {
  return (
    <svg className="glass" viewBox="0 0 32 32" aria-hidden>
      <path d="M4 6h24L17 18v8h5v2H10v-2h5v-8z" fill="currentColor" />
      <circle cx="19" cy="10" r="2" fill="var(--bg)" />
    </svg>
  )
}
