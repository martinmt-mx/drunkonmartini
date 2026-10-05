import { useState } from 'react'
import { profile } from '../profile'

// Contador de visitas falso-retro: cuenta tus propias visitas en este navegador.
function useVisits() {
  const [n] = useState(() => {
    try {
      const v = Number(localStorage.getItem('dom-visits') ?? '1336') + 1
      localStorage.setItem('dom-visits', String(v))
      return v
    } catch {
      return 1337
    }
  })
  return n
}

export function Footer() {
  const visits = useVisits()

  return (
    <footer className="footer">
      <ul className="socials">
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>
          </li>
        ))}
      </ul>
      <div className="badges" aria-hidden>
        <span className="badge">hecho a las <b>3AM</b></span>
        <span className="badge">best viewed <b>de noche</b></span>
        <span className="badge counter">visitas <b className="pixel">{String(visits).padStart(6, '0')}</b></span>
      </div>
      <p className="dim pixel">© {new Date().getFullYear()} {profile.handle} · todos los derechos, ningún arrepentimiento</p>
    </footer>
  )
}
