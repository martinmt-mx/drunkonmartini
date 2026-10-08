import { useCallback, useEffect, useState } from 'react'
import { fetchBeats, fetchCredits, fetchReleases, fetchScene } from './api'
import { ArtistSide } from './components/ArtistSide'
import { AudioRing } from './components/AudioRing'
import { Contact, type ContactPrefill } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MenuBar } from './components/MenuBar'
import { Player } from './components/Player'
import { ProducerSide } from './components/ProducerSide'
import { Scene } from './components/Scene'
import { PlayerProvider } from './player/PlayerContext'
import type { Beat, Credit, Release, SceneArtist, Side } from './types'

/** Cada pestaña tiene su #: así se puede compartir el link directo a cualquiera. */
const HASH_FOR_SIDE: Record<Side, string> = { a: '#artista', b: '#productor', c: '#escena' }
/** Pestaña del # actual; null si el # no es de una pestaña (p. ej. #contacto sólo hace scroll). */
const sideForHash = (): Side | null =>
  (Object.keys(HASH_FOR_SIDE) as Side[]).find((s) => HASH_FOR_SIDE[s] === location.hash) ?? null
const sideFromHash = (): Side => sideForHash() ?? 'a'

export function App() {
  const [side, setSideState] = useState<Side>(sideFromHash)
  const [releases, setReleases] = useState<Release[]>([])
  const [beats, setBeats] = useState<Beat[]>([])
  const [credits, setCredits] = useState<Credit[]>([])
  const [scene, setScene] = useState<SceneArtist[]>([])
  const [live, setLive] = useState<boolean | null>(null)
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null)

  useEffect(() => {
    Promise.all([fetchReleases(), fetchBeats(), fetchCredits(), fetchScene()]).then(([r, b, c, s]) => {
      setReleases(r.data)
      setBeats(b.data)
      setCredits(c.data)
      setScene(s.data)
      setLive(r.live && b.live && c.live && s.live)
    })
  }, [])

  useEffect(() => {
    const onHash = () => {
      const s = sideForHash()
      if (s) setSideState(s)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.side = side
  }, [side])

  const setSide = useCallback((s: Side) => {
    setSideState(s)
    history.replaceState(null, '', HASH_FOR_SIDE[s])
    document.getElementById('lado')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const onLicense = useCallback((beat: Beat) => {
    setPrefill({
      kind: 'beat',
      body: `Me interesa "${beat.title}" (${beat.bpm} bpm, ${beat.musical_key}). ¿Licencia básica o exclusiva?`,
      nonce: Date.now(),
    })
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <PlayerProvider>
      <AudioRing />
      <div className="crt" aria-hidden />
      <MenuBar side={side} onSide={setSide} live={live} />
      <main className="page">
        <Hero side={side} onSide={setSide} />
        <div id="lado" className="side-content" key={side}>
          {side === 'a' && <ArtistSide releases={releases} />}
          {side === 'b' && <ProducerSide beats={beats} credits={credits} onLicense={onLicense} />}
          {side === 'c' && <Scene artists={scene} />}
        </div>
        <Contact prefill={prefill} />
        <Footer />
      </main>
      <Player />
    </PlayerProvider>
  )
}
