import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Playable } from '../types'
import { createEngine, type Engine } from './engine'

type PlayerState = {
  current: Playable | null
  playing: boolean
  isDemo: boolean
  time: number
  duration: number
  analyser: AnalyserNode | null
  play: (track: Playable) => void
  toggle: () => void
  /** Detiene el audio pero deja la barra visible (se usa cuando termina una canción). */
  stop: () => void
  /** Detiene el audio y oculta la barra del reproductor (botón ✕). */
  close: () => void
}

const PlayerCtx = createContext<PlayerState | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const engine = useRef<Engine | null>(null)
  const requestId = useRef(0)
  const [current, setCurrent] = useState<Playable | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const stop = useCallback(() => {
    engine.current?.stop()
    engine.current = null
    setPlaying(false)
    setTime(0)
  }, [])

  const close = useCallback(() => {
    requestId.current++ // si había un track cargando, que ya no empiece a sonar
    stop()
    setCurrent(null)
  }, [stop])

  const play = useCallback((track: Playable) => {
    stop()
    setCurrent(track)
    const request = ++requestId.current
    createEngine(track, stop)
      .then((e) => {
        if (request !== requestId.current) return e.stop()
        engine.current = e
        setPlaying(true)
      })
      .catch(() => setPlaying(false))
  }, [stop])

  const toggle = useCallback(() => {
    const e = engine.current
    if (!e) {
      if (current) play(current)
      return
    }
    if (playing) void e.pause().then(() => setPlaying(false))
    else void e.resume().then(() => setPlaying(true))
  }, [current, play, playing])

  useEffect(() => {
    if (!playing) return
    let raf = 0
    const tick = () => {
      const e = engine.current
      if (e) {
        setTime(e.currentTime())
        setDuration(e.duration())
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  useEffect(() => () => engine.current?.stop(), [])

  return (
    <PlayerCtx.Provider
      value={{
        current,
        playing,
        isDemo: engine.current?.isDemo ?? !current?.audioUrl,
        time,
        duration,
        analyser: engine.current?.analyser ?? null,
        play,
        toggle,
        stop,
        close,
      }}
    >
      {children}
    </PlayerCtx.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerCtx)
  if (!ctx) throw new Error('usePlayer fuera de PlayerProvider')
  return ctx
}
