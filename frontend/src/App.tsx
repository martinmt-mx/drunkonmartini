import { useCallback, useEffect, useState } from 'react'
import { fetchBeats, fetchReleases } from './api'
import { ArtistSide } from './components/ArtistSide'
import { Contact, type ContactPrefill } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MenuBar } from './components/MenuBar'
import { Player } from './components/Player'
import { ProducerSide } from './components/ProducerSide'
import { PlayerProvider } from './player/PlayerContext'
import type { Beat, Release, Side } from './types'

const sideFromHash = (): Side => (location.hash === '#productor' ? 'b' : 'a')

export function App() {
  const [side, setSideState] = useState<Side>(sideFromHash)
  const [releases, setReleases] = useState<Release[]>([])
  const [beats, setBeats] = useState<Beat[]>([])
  const [live, setLive] = useState<boolean | null>(null)
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null)

  useEffect(() => {
    Promise.all([fetchReleases(), fetchBeats()]).then(([r, b]) => {
      setReleases(r.data)
      setBeats(b.data)
      setLive(r.live && b.live)
    })
  }, [])

  useEffect(() => {
    const onHash = () => setSideState(sideFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.side = side
  }, [side])

  const setSide = useCallback((s: Side) => {
    setSideState(s)
    history.replaceState(null, '', s === 'b' ? '#productor' : '#artista')
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
      <div className="crt" aria-hidden />
      <MenuBar side={side} onSide={setSide} live={live} />
      <main className="page">
        <Hero side={side} onSide={setSide} />
        <div id="lado" className="side-content" key={side}>
          {side === 'a' ? <ArtistSide releases={releases} /> : <ProducerSide beats={beats} onLicense={onLicense} />}
        </div>
        <Contact prefill={prefill} />
        <Footer />
      </main>
      <Player />
    </PlayerProvider>
  )
}
