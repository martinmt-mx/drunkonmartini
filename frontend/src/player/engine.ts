import type { Playable } from '../types'

// Motor de audio único: reproduce el archivo real si existe (audio_url), y si no,
// sintetiza un loop demo con la tonalidad y BPM del track. Ambos caminos pasan
// por el mismo AnalyserNode para el visualizador.

export type Engine = {
  analyser: AnalyserNode
  duration: () => number
  currentTime: () => number
  pause: () => Promise<void>
  resume: () => Promise<void>
  stop: () => void
  isDemo: boolean
}

const DEMO_SECONDS = 30
// i – VI – III – VII en menor: la progresión nocturna de siempre.
const PROGRESSION = [[0, 3, 7], [-4, 0, 3], [3, 7, 10], [-2, 2, 5]]

const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12)

function chain(ctx: AudioContext) {
  const master = ctx.createGain()
  master.gain.value = 0.8
  const comp = ctx.createDynamicsCompressor()
  const analyser = ctx.createAnalyser()
  analyser.fftSize = 512 // 256 bandas de frecuencia: suficientes para el círculo de fondo
  analyser.smoothingTimeConstant = 0.8
  master.connect(comp).connect(analyser).connect(ctx.destination)
  return { master, analyser }
}

export async function createEngine(track: Playable, onEnded: () => void): Promise<Engine> {
  const ctx = new AudioContext()
  const { master, analyser } = chain(ctx)

  if (track.audioUrl) {
    const el = new Audio(track.audioUrl)
    el.crossOrigin = 'anonymous'
    ctx.createMediaElementSource(el).connect(master)
    el.addEventListener('ended', onEnded)
    await el.play()
    return {
      analyser,
      isDemo: false,
      duration: () => (Number.isFinite(el.duration) ? el.duration : 0),
      currentTime: () => el.currentTime,
      pause: async () => el.pause(),
      resume: async () => { await el.play() },
      stop: () => { el.pause(); el.src = ''; void ctx.close() },
    }
  }

  const t0 = ctx.currentTime + 0.05
  scheduleDemo(ctx, master, track, t0)
  const timer = window.setInterval(() => {
    if (ctx.currentTime - t0 >= DEMO_SECONDS) onEnded()
  }, 250)

  return {
    analyser,
    isDemo: true,
    duration: () => DEMO_SECONDS,
    currentTime: () => Math.max(0, Math.min(DEMO_SECONDS, ctx.currentTime - t0)),
    pause: () => ctx.suspend(),
    resume: () => ctx.resume(),
    stop: () => { window.clearInterval(timer); void ctx.close() },
  }
}

function scheduleDemo(ctx: AudioContext, out: AudioNode, track: Playable, t0: number) {
  const beat = 60 / track.bpm
  const bar = beat * 4
  const end = t0 + DEMO_SECONDS
  const noise = noiseBuffer(ctx)
  const trap = track.side === 'b' && track.bpm >= 120

  // Tempos de trap se tocan en half-time para que los acordes respiren.
  const chordLen = trap ? bar * 2 : bar

  for (let i = 0; t0 + i * chordLen < end; i++) {
    const start = t0 + i * chordLen
    const chord = PROGRESSION[i % PROGRESSION.length]
    chord.forEach((iv) => pad(ctx, out, mtof(track.rootNote + iv), start, chordLen))
    bass(ctx, out, mtof(track.rootNote + chord[0] - 24), start, chordLen)
  }

  for (let n = 0; t0 + n * beat < end; n++) {
    const at = t0 + n * beat
    const pos = n % (trap ? 8 : 4)
    if (trap) {
      if (pos === 0 || pos === 5) kick(ctx, out, at)
      if (pos === 4) clap(ctx, out, noise, at)
      for (let h = 0; h < (pos === 7 ? 4 : 2); h++) hat(ctx, out, noise, at + (h * beat) / (pos === 7 ? 4 : 2))
    } else {
      if (pos === 0 || (pos === 2 && n % 8 === 2)) kick(ctx, out, at)
      if (pos === 2) clap(ctx, out, noise, at)
      hat(ctx, out, noise, at + beat / 2, 0.04)
    }
  }
}

function pad(ctx: AudioContext, out: AudioNode, freq: number, at: number, len: number) {
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(700, at)
  filter.frequency.linearRampToValueAtTime(1400, at + len / 2)
  filter.frequency.linearRampToValueAtTime(700, at + len)
  const g = ctx.createGain()
  g.gain.setValueAtTime(0, at)
  g.gain.linearRampToValueAtTime(0.05, at + 0.4)
  g.gain.setValueAtTime(0.05, at + len - 0.3)
  g.gain.linearRampToValueAtTime(0, at + len + 0.2)
  filter.connect(g).connect(out)
  for (const detune of [-8, 8]) {
    const o = ctx.createOscillator()
    o.type = 'sawtooth'
    o.frequency.value = freq
    o.detune.value = detune
    o.connect(filter)
    o.start(at)
    o.stop(at + len + 0.3)
  }
}

function bass(ctx: AudioContext, out: AudioNode, freq: number, at: number, len: number) {
  const o = ctx.createOscillator()
  o.type = 'sine'
  o.frequency.value = freq
  const g = ctx.createGain()
  g.gain.setValueAtTime(0, at)
  g.gain.linearRampToValueAtTime(0.35, at + 0.02)
  g.gain.exponentialRampToValueAtTime(0.001, at + len)
  o.connect(g).connect(out)
  o.start(at)
  o.stop(at + len)
}

function kick(ctx: AudioContext, out: AudioNode, at: number) {
  const o = ctx.createOscillator()
  o.frequency.setValueAtTime(140, at)
  o.frequency.exponentialRampToValueAtTime(42, at + 0.12)
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.9, at)
  g.gain.exponentialRampToValueAtTime(0.001, at + 0.45)
  o.connect(g).connect(out)
  o.start(at)
  o.stop(at + 0.5)
}

function noiseBuffer(ctx: AudioContext) {
  const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return buf
}

function burst(ctx: AudioContext, out: AudioNode, buf: AudioBuffer, at: number, type: BiquadFilterType, freq: number, level: number, decay: number) {
  const src = ctx.createBufferSource()
  src.buffer = buf
  const f = ctx.createBiquadFilter()
  f.type = type
  f.frequency.value = freq
  const g = ctx.createGain()
  g.gain.setValueAtTime(level, at)
  g.gain.exponentialRampToValueAtTime(0.001, at + decay)
  src.connect(f).connect(g).connect(out)
  src.start(at)
  src.stop(at + decay + 0.05)
}

const hat = (ctx: AudioContext, out: AudioNode, buf: AudioBuffer, at: number, level = 0.06) =>
  burst(ctx, out, buf, at, 'highpass', 8000, level, 0.04)

const clap = (ctx: AudioContext, out: AudioNode, buf: AudioBuffer, at: number) =>
  burst(ctx, out, buf, at, 'bandpass', 1600, 0.35, 0.18)
