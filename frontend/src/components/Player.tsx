import { useEffect, useRef } from 'react'
import { usePlayer } from '../player/PlayerContext'

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

// Barra fija tipo Winamp, en versión minimal.
export function Player() {
  const { current, playing, isDemo, time, duration, analyser, toggle, close } = usePlayer()
  if (!current) return null

  const pct = duration ? (time / duration) * 100 : 0

  return (
    <div className={`player side-${current.side}`} role="region" aria-label="Reproductor">
      <Visualizer analyser={analyser} active={playing} />
      <button className="play big" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
        {playing ? '❚❚' : '▶'}
      </button>
      <div className="player-info">
        <div className="player-title">
          <span className="marquee">{current.title}</span>
          <span className="dim"> — {current.subtitle}</span>
          {isDemo && <span className="tag pixel" title="Sin archivo de audio todavía: sintetizado en el navegador">demo synth</span>}
          {current.isPreview && <span className="tag pixel" title="Fragmento de la canción, no la versión completa">preview</span>}
        </div>
        <div className="progress" aria-hidden>
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>
      <span className="pixel player-time">{fmt(time)} / {fmt(duration)}</span>
      <button className="player-close" onClick={close} aria-label="Cerrar reproductor">×</button>
    </div>
  )
}

function Visualizer({ analyser, active }: { analyser: AnalyserNode | null; active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvas.current
    const g = c?.getContext('2d')
    if (!c || !g) return
    const bins = new Uint8Array(analyser?.frequencyBinCount ?? 64)
    const color = getComputedStyle(c).color
    const bars = 16
    let raf = 0

    const draw = () => {
      g.clearRect(0, 0, c.width, c.height)
      if (analyser && active) analyser.getByteFrequencyData(bins)
      else bins.fill(0)
      const w = c.width / bars
      g.fillStyle = color
      for (let i = 0; i < bars; i++) {
        const v = bins[Math.floor((i / bars) ** 1.6 * bins.length * 0.7)] / 255
        // Bloques "LED" de 3px, como los ecualizadores de antes.
        const h = Math.max(3, Math.round((v * c.height) / 4) * 4)
        for (let y = c.height - 3; y > c.height - h; y -= 4) g.fillRect(i * w + 1, y, w - 2, 3)
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [analyser, active])

  return <canvas ref={canvas} className="viz" width={96} height={36} aria-hidden />
}
