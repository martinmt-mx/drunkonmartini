import { useEffect, useState } from 'react'
import { profile } from '../profile'
import type { Side } from '../types'

export function Hero({ side, onSide }: { side: Side; onSide: (s: Side) => void }) {
  const tagline = profile.sides[side].tagline
  const typed = useTypewriter(tagline)

  return (
    <header className="hero" id="top">
      <p className="hero-kicker pixel">C:\&gt; play --side={side}</p>
      <h1 className="hero-name">
        drunk<span className="accent">on</span>martini
      </h1>
      <p className="hero-tagline">
        {typed}
        <span className="caret" aria-hidden>▍</span>
      </p>

      <div className="cassette" role="tablist" aria-label="Elige una sección">
        {(['a', 'b', 'c'] as const).map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={side === s}
            className={`cassette-side side-${s} ${side === s ? 'on' : ''}`}
            onClick={() => onSide(s)}
          >
            <span className="cassette-label pixel">{profile.sides[s].label}</span>
            <span className="cassette-role">{profile.sides[s].role}</span>
            <span className="cassette-reels" aria-hidden><i /><i /></span>
          </button>
        ))}
      </div>
    </header>
  )
}

function useTypewriter(text: string) {
  const [n, setN] = useState(0)

  useEffect(() => {
    setN(0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(text.length)
      return
    }
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= text.length) window.clearInterval(id)
        return Math.min(v + 1, text.length)
      })
    }, 38)
    return () => window.clearInterval(id)
  }, [text])

  return text.slice(0, n)
}
