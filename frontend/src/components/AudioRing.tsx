import { useEffect, useRef } from 'react'
import { usePlayer } from '../player/PlayerContext'

// Esfera de puntos en 3D al fondo, estilo NCS, que reacciona a lo que suena.
//
// - Una malla de puntos sobre una esfera (anillos de latitud × columnas de longitud)
//   que gira despacio y se proyecta con perspectiva: lo de atrás se ve más chico y tenue.
// - La música deforma la superficie con 5 "ondas" (modos), cada una movida por una zona
//   del espectro. Donde la superficie se dobla, los puntos se amontonan y forman las
//   cintas brillantes típicas de NCS.
// - Un aro grueso y brillante marca el borde y vibra con los bajos.

const COLORS = { a: '255, 42, 61', b: '255, 176, 0', c: '164, 107, 255' } as const

/** Ondas sobre la esfera: frecuencia en latitud (lat), en longitud (lon), velocidad y zona del espectro. */
const MODES = [
  { lat: 2, lon: 1, speed: 0.3, band: [1, 6] },      // bajos
  { lat: 2, lon: 2, speed: -0.45, band: [6, 18] },   // medios bajos
  { lat: 3, lon: 1, speed: 0.6, band: [18, 40] },    // medios
  { lat: 3, lon: 2, speed: -0.75, band: [40, 80] },  // medios altos
  { lat: 4, lon: 3, speed: 1, band: [80, 140] },     // agudos
] as const

/** Grupos de profundidad: se dibujan de atrás hacia adelante con su propia opacidad. */
const DEPTH_ALPHA = [0.3, 0.55, 0.95]

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
    const RINGS = small ? 36 : 56 // anillos de latitud
    const COLS = small ? 72 : 112 // puntos por anillo
    const total = RINGS * COLS
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const rgb = COLORS[side]
    const bins = new Uint8Array(analyser?.frequencyBinCount ?? 256)

    // Geometría fija de la esfera unitaria, calculada una sola vez.
    const theta = Float32Array.from({ length: RINGS }, (_, i) => ((i + 0.5) / RINGS) * Math.PI)
    const phi = Float32Array.from({ length: COLS }, (_, j) => (j / COLS) * Math.PI * 2)
    const sinT = theta.map(Math.sin)
    const cosT = theta.map(Math.cos)
    const sinP = phi.map(Math.sin)
    const cosP = phi.map(Math.cos)

    // Energía suavizada de cada onda, y fase (avanza más rápido cuando hay energía).
    const energy = new Float32Array(MODES.length)
    const phase = new Float32Array(MODES.length)
    let bassSmooth = 0
    let last = performance.now()

    // Buffers por grupo de profundidad: x, y, tamaño.
    const buckets = DEPTH_ALPHA.map(() => ({ xs: new Float32Array(total), ys: new Float32Array(total), ss: new Float32Array(total), n: 0 }))
    const latWave = MODES.map(() => new Float32Array(RINGS))
    const lonWave = MODES.map(() => new Float32Array(COLS))

    const resize = () => {
      c.width = Math.round(window.innerWidth * dpr)
      c.height = Math.round(window.innerHeight * dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const draw = (time: number) => {
      const dt = Math.min(0.05, (time - last) / 1000)
      last = time
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

      // Energía por zona del espectro → amplitud y velocidad de cada onda.
      MODES.forEach((m, k) => {
        let sum = 0
        for (let i = m.band[0]; i < m.band[1]; i++) sum += bins[i]
        const v = (sum / ((m.band[1] - m.band[0]) * 255)) ** 1.5
        energy[k] += (v - energy[k]) * 0.12
        phase[k] += dt * m.speed * (0.4 + energy[k] * 2.5)
      })
      bassSmooth += (energy[0] - bassSmooth) * 0.25

      // Senos de cada onda por fila y por columna (no por punto: mucho más barato).
      MODES.forEach((m, k) => {
        for (let i = 0; i < RINGS; i++) latWave[k][i] = Math.sin(m.lat * theta[i] + phase[k] * 1.3)
        for (let j = 0; j < COLS; j++) lonWave[k][j] = Math.cos(m.lon * phi[j] + phase[k])
      })

      const R = Math.min(W, H) * (small ? 0.28 : 0.23) * (1 + bassSmooth * 0.12)
      const cx = W / 2
      const cy = H / 2
      const focal = R * 3.2
      const rotY = time * 0.00012
      const tilt = 0.35 + Math.sin(time * 0.00007) * 0.15
      const cy1 = Math.cos(rotY), sy1 = Math.sin(rotY)
      const cx1 = Math.cos(tilt), sx1 = Math.sin(tilt)
      const dot = (small ? 1.6 : 1.9) * dpr
      buckets.forEach((b) => { b.n = 0 })

      for (let i = 0; i < RINGS; i++) {
        for (let j = 0; j < COLS; j++) {
          // Desplazamiento radial: suma de ondas pesada por su energía.
          let d = 0
          for (let k = 0; k < MODES.length; k++) d += energy[k] * latWave[k][i] * lonWave[k][j]
          // Sólo hacia adentro: el borde queda pegado al aro y los pliegues se forman dentro.
          const r = R * (1 - Math.min(0.75, Math.max(0, d) * 0.9))

          // Punto en la esfera → rotación (eje Y, luego inclinación en X) → perspectiva.
          const x0 = r * sinT[i] * cosP[j]
          const y0 = r * cosT[i]
          const z0 = r * sinT[i] * sinP[j]
          const x1 = x0 * cy1 + z0 * sy1
          const z1 = -x0 * sy1 + z0 * cy1
          const y2 = y0 * cx1 - z1 * sx1
          const z2 = y0 * sx1 + z1 * cx1
          const s = focal / (focal + z2)

          const depth = z2 / R // -1 = al frente, +1 = atrás
          const b = buckets[depth > 0.35 ? 0 : depth > -0.35 ? 1 : 2]
          b.xs[b.n] = cx + x1 * s
          b.ys[b.n] = cy + y2 * s
          b.ss[b.n] = dot * s
          b.n++
        }
      }

      const alpha = fade.current
      g.globalCompositeOperation = 'lighter'
      g.fillStyle = `rgb(${rgb})`
      buckets.forEach((b, k) => {
        g.globalAlpha = alpha * DEPTH_ALPHA[k]
        for (let p = 0; p < b.n; p++) g.fillRect(b.xs[p], b.ys[p], b.ss[p], b.ss[p])
      })

      // Aro brillante del borde: vibra con los bajos y un poco con los medios.
      const rim = R * 1.04
      g.beginPath()
      const steps = 120
      for (let p = 0; p <= steps; p++) {
        const a = (p / steps) * Math.PI * 2
        const wobble = 1 + bassSmooth * 0.025 * Math.sin(a * 2 + phase[0] * 2) + energy[2] * 0.015 * Math.sin(a * 5 - phase[2] * 3)
        const x = cx + Math.cos(a) * rim * wobble
        const y = cy + Math.sin(a) * rim * wobble
        if (p === 0) g.moveTo(x, y)
        else g.lineTo(x, y)
      }
      g.strokeStyle = `rgb(${rgb})`
      g.globalAlpha = alpha * 0.14
      g.lineWidth = 42 * dpr
      g.stroke()
      g.globalAlpha = alpha * 0.35
      g.lineWidth = 16 * dpr
      g.stroke()
      g.globalAlpha = alpha * (0.9 + bassSmooth * 0.1)
      g.lineWidth = 6 * dpr
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
