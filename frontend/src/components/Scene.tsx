import type { SceneArtist, Side } from '../types'
import { usePlayer } from '../player/PlayerContext'
import { Cover } from './Cover'
import { Win } from './Win'

// Sección "Escena": artistas de Colima que Martini recomienda. Se ve igual en el Lado A
// y en el B: es un espacio aparte para otros artistas.
export function Scene({ artists, side }: { artists: SceneArtist[]; side: Side }) {
  if (artists.length === 0) return null

  return (
    <section className="scene" id="escena">
      <Win title={`escena_colima/ (${artists.length})`}>
        <p className="scene-intro">
          Artistas de Colima que escucho y recomiendo. Dale play, síguelos y apoya la escena local.
          <span className="dim"> ¿Eres de Colima y haces música? <a href="#contacto">Escríbeme</a>.</span>
        </p>
        <ul className="credits scene-grid">
          {artists.map((a) => <ArtistCard key={a.id} artist={a} side={side} />)}
        </ul>
      </Win>
    </section>
  )
}

const LINK_LABELS: Record<string, string> = {
  tiktok: 'TikTok',
  youtube: 'YouTube',
  soundcloud: 'SoundCloud',
  bandcamp: 'Bandcamp',
}

function ArtistCard({ artist, side }: { artist: SceneArtist; side: Side }) {
  const { current, playing, play, toggle } = usePlayer()
  const key = `s${artist.id}`
  const isCurrent = current?.key === key

  const onPlay = () =>
    isCurrent
      ? toggle()
      : play({
          key,
          title: artist.track_title ?? artist.name,
          subtitle: artist.name,
          side,
          audioUrl: artist.preview_url,
          isPreview: true,
          bpm: 90,
          rootNote: 57,
        })

  return (
    <li className={`credit ${isCurrent ? 'playing' : ''}`}>
      <Cover title={artist.name} artworkUrl={artist.artwork_url} />
      <div className="credit-info">
        <span className="credit-title">{artist.name}</span>
        {artist.track_title && <span className="dim">♪ {artist.track_title}</span>}
        {artist.genre && <span className="pixel accent">{artist.genre}</span>}
        <span className="stream-links">
          <a href={artist.instagram_url} target="_blank" rel="noreferrer">Instagram ↗</a>
          {artist.spotify_url && <a href={artist.spotify_url} target="_blank" rel="noreferrer">Spotify ↗</a>}
          {(artist.apple_artist_url ?? artist.apple_url) && (
            <a href={(artist.apple_artist_url ?? artist.apple_url)!} target="_blank" rel="noreferrer">Apple Music ↗</a>
          )}
          {Object.entries(artist.links).map(([k, url]) => (
            <a key={k} href={url} target="_blank" rel="noreferrer">{LINK_LABELS[k] ?? k} ↗</a>
          ))}
        </span>
      </div>
      {artist.preview_url && (
        <button className="play" onClick={onPlay} aria-label={`${isCurrent && playing ? 'Pausar' : 'Reproducir'} ${artist.track_title ?? artist.name}`}>
          {isCurrent && playing ? '❚❚' : '▶'}
        </button>
      )}
    </li>
  )
}
