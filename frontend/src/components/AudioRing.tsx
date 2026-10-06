import { useEffect, useRef } from 'react'
import { usePlayer } from '../player/PlayerContext'

// Círculo de partículas al fondo, estilo NCS, que reacciona a lo que suena.
// - El espectro se reparte en espejo alrededor del círculo (izquierda = derecha).
// - Los bajos hacen "respirar" todo el círculo.
// - Varias capas siguen al audio a distinta velocidad: la de afuera reacciona
//   al instante y las de adentro se quedan atrás, lo que da el efecto de banda 3D.

const COLORS = { a: '255, 42, 61', b: '255, 176, 0' } as const
/** Qué tan rápido sigue cada capa al audio (1 = instantáneo). */
const LAYER_SPEED = [0.5, 0.28, 0.16, 0.09]
/** Partículas entre el borde interior y cada punto del espectro. */
const DOTS_PER_SPOKE = 4

export function AudioRing() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const fade = useRef(0) // opacidad actual; persiste entre play y pausa
  const { analyser, playing, current } = usePlayer()
  const side = current?.side ?? 'a'

  useEffect(() => {
    const c = canvas.current
    const g = c?.getContext('2d')
    if (!c || !g) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const small = window.innerWidth < 720
    const half = small ? 36 : 60 // puntos en media vuelta; menos en celular
    const bins = new Uint8Array(analyser?.frequencyBinCount ?? 256)
    const layers = LAYER_SPEED.map(() => new Float32Array(half))
    const rgb = COLORS[side]
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      c.width = Math.round(window.innerWidth * dpr)
      c.height = Math.round(window.innerHeight * dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const draw = (time: number) => {
      fade.current += ((playing ? 1 : 0) - fade.current) * 0.05
      const W = c.width
      const H = c.height
      g.clearRect(0, 0, W, H)

      if (!playing && fade.current < 0.01) {
        fade.current = 0
        return // en pausa y ya desvanecido: no seguimos dibujando
      }

      if (analyser && playing) analyser.getByteFrequencyData(bins)
      else bins.fill(0)

      // Bajos (primeros bins) → escala de todo el círculo.
      let bass = 0
      for (let i = 0; i < 8; i++) bass += bins[i]
      bass /= 8 * 255
      const base = Math.min(W, H) * (small ? 0.26 : 0.19) * (1 + bass * 0.14)
      const amp = base * 0.6

      // Espectro de media vuelta, con más resolución en graves y medios.
      for (let j = 0; j < half; j++) {
        const t = j / (half - 1)
        const idx = Math.min(bins.length - 1, Math.floor(2 + t ** 1.7 * bins.length * 0.6))
        const v = (bins[idx] / 255) ** 2
        layers.forEach((layer, k) => { layer[j] += (v - layer[j]) * LAYER_SPEED[k] })
      }

      const cx = W / 2
      const cy = H / 2
      const n = half * 2
      const spin = time * 0.00004
      const size = (small ? 1.6 : 1.9) * dpr
      g.globalAlpha = fade.current
      g.globalCompositeOperation = 'lighter'

      // Capas de partículas, de adentro hacia afuera.
      for (let k = layers.length - 1; k >= 0; k--) {
        g.fillStyle = `rgba(${rgb}, ${0.5 - k * 0.09})`
        for (let i = 0; i < n; i++) {
          const v = layers[k][i < half ? i : n - 1 - i] // espejo
          const angle = spin - Math.PI / 2 + (i / n) * Math.PI * 2 + k * 0.012
          const outer = base + v * amp * (1 - k * 0.1) + k * 3 * dpr
          const inner = base * 0.94
          const cos = Math.cos(angle)
          const sin = Math.sin(angle)
          for (let d = 1; d <= DOTS_PER_SPOKE; d++) {
            const r = inner + ((outer - inner) * d) / DOTS_PER_SPOKE
            g.fillRect(cx + cos * r, cy + sin * r, size, size)
          }
        }
      }

      // Contorno brillante de la capa exterior: un trazo ancho y tenue + uno fino.
      g.beginPath()
      for (let i = 0; i <= n; i++) {
        const v = layers[0][i % n < half ? i % n : n - 1 - (i % n)]
        const angle = spin - Math.PI / 2 + (i / n) * Math.PI * 2
        const r = base + v * amp
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        if (i === 0) g.moveTo(x, y)
        else g.lineTo(x, y)
      }
      g.strokeStyle = `rgba(${rgb}, 0.18)`
      g.lineWidth = 10 * dpr
      g.stroke()
      g.strokeStyle = `rgba(${rgb}, 0.9)`
      g.lineWidth = 2 * dpr
      g.stroke()

      g.globalCompositeOperation = 'source-over'
      g.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [analyser, playing, side])

  return <canvas ref={canvas} className="audio-ring" aria-hidden />
}
