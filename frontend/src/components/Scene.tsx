import { profile } from '../profile'
import type { SceneArtist } from '../types'
import { usePlayer } from '../player/PlayerContext'
import { Cover } from './Cover'
import { Win } from './Win'

// Pestaña "Escena": artistas de Colima que Martini recomienda, como una lista de tarjetas
// anchas (portada a la izquierda; nombre, género, canción y redes a la derecha).
export function Scene({ artists }: { artists: SceneArtist[] }) {
  return (
    <div className="side-grid">
      <Win title="leeme.txt" className="span-2">
        <p className="bio">{profile.sides.c.bio}</p>
        <p className="scene-invite dim">
          ¿Eres de Colima y haces música? <a href="#contacto">Escríbeme</a>.
        </p>
      </Win>

      <ul className="scene-list span-2">
        {artists.map((a) => <ArtistCard key={a.id} artist={a} />)}
      </ul>
    </div>
  )
}

const LINK_LABELS: Record<string, string> = {
  tiktok: 'TikTok',
  youtube: 'YouTube',
  soundcloud: 'SoundCloud',
  bandcamp: 'Bandcamp',
}

function ArtistCard({ artist }: { artist: SceneArtist }) {
  const { current, playing, play, toggle } = usePlayer()
  const key = `s${artist.id}`
  const isCurrent = current?.key === key
  const appleProfile = artist.apple_artist_url ?? artist.apple_url

  const onPlay = () =>
    isCurrent
      ? toggle()
      : play({
          key,
          title: artist.track_title ?? artist.name,
          subtitle: artist.name,
          side: 'c',
          audioUrl: artist.preview_url,
          isPreview: true,
          bpm: 90,
          rootNote: 57,
        })

  return (
    <li className={`scene-card ${isCurrent ? 'playing' : ''}`}>
      <Cover title={artist.name} artworkUrl={artist.artwork_url} />

      <div className="scene-body">
        <div className="scene-head">
          <h3 className="scene-name">{artist.name}</h3>
          {artist.genre && <span className="scene-genre pixel">{artist.genre}</span>}
        </div>

        {artist.track_title && (
          <div className="scene-track">
            {artist.preview_url && (
              <button className="play" onClick={onPlay} aria-label={`${isCurrent && playing ? 'Pausar' : 'Reproducir'} ${artist.track_title}`}>
                {isCurrent && playing ? '❚❚' : '▶'}
              </button>
            )}
            <span className="scene-track-title">{artist.track_title}</span>
          </div>
        )}

        <span className="stream-links">
          <a href={artist.instagram_url} target="_blank" rel="noreferrer">Instagram ↗</a>
          {artist.spotify_url && <a href={artist.spotify_url} target="_blank" rel="noreferrer">Spotify ↗</a>}
          {appleProfile && <a href={appleProfile} target="_blank" rel="noreferrer">Apple Music ↗</a>}
          {Object.entries(artist.links).map(([k, url]) => (
            <a key={k} href={url} target="_blank" rel="noreferrer">{LINK_LABELS[k] ?? k} ↗</a>
          ))}
        </span>
      </div>
    </li>
  )
}
