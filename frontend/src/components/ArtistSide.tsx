import { useState } from 'react'
import { profile } from '../profile'
import type { Release, Track } from '../types'
import { usePlayer } from '../player/PlayerContext'
import { Cover, StreamLinks } from './Cover'
import { Win } from './Win'

const KIND_LABEL = { album: 'Álbum', ep: 'EP', single: 'Single' } as const

export function ArtistSide({ releases }: { releases: Release[] }) {
  const [openId, setOpenId] = useState<number | null>(null)
  const open = releases.find((r) => r.id === openId) ?? releases[0]
  const eras = [...new Set(releases.map((r) => r.era).filter((e): e is string => !!e))]

  return (
    <div className="side-grid">
      <Win title="leeme.txt" className="span-2">
        <p className="bio">{profile.sides.a.bio}</p>
        {eras.length > 0 && (
          <ol className="eras">
            {eras.map((era, i) => (
              <li key={era} className={i === eras.length - 1 ? 'current' : ''}>
                <span className="pixel">{era}</span>
              </li>
            ))}
          </ol>
        )}
      </Win>

      <Win title={`discografia/ (${releases.length})`} className="span-2">
        <ul className="releases">
          {releases.map((r) => (
            <li key={r.id}>
              <button
                className={`release ${open?.id === r.id ? 'on' : ''}`}
                onClick={() => setOpenId(r.id)}
              >
                <Cover title={r.title} artworkUrl={r.artwork_url} from={r.cover_from} to={r.cover_to} />
                <span className="release-title">{r.title}</span>
                <span className="release-meta dim">{KIND_LABEL[r.kind]} · {r.year}</span>
              </button>
            </li>
          ))}
        </ul>
      </Win>

      {open && (
        <Win title={`${open.title}.m3u`} className="span-2" aside={<span className="dim">{KIND_LABEL[open.kind]} · {open.year}</span>}>
          <div className="tracklist-head">
            <Cover title={open.title} artworkUrl={open.artwork_url} from={open.cover_from} to={open.cover_to} big />
            <div>
              <h3 className="serif">{open.title}</h3>
              {open.description && <p className="dim">{open.description}</p>}
              <StreamLinks spotify={open.spotify_url} apple={open.apple_url} />
            </div>
          </div>
          <ol className="tracklist">
            {open.tracks.map((t, i) => (
              <TrackRow key={t.id} track={t} index={i} release={open} />
            ))}
          </ol>
          {open.tracks.some((t) => !t.audio_url && t.preview_url) && (
            <p className="note dim">previews de 30 s · completas en Spotify o Apple Music</p>
          )}
        </Win>
      )}
    </div>
  )
}

function TrackRow({ track, index, release }: { track: Track; index: number; release: Release }) {
  const { current, playing, play, toggle } = usePlayer()
  const key = `t${track.id}`
  const isCurrent = current?.key === key

  const onClick = () =>
    isCurrent
      ? toggle()
      : play({
          key,
          title: track.title,
          subtitle: release.title,
          side: 'a',
          audioUrl: track.audio_url ?? track.preview_url,
          isPreview: !track.audio_url && !!track.preview_url,
          bpm: track.bpm ?? 90,
          rootNote: track.root_note ?? 57,
        })

  return (
    <li className={isCurrent ? 'playing' : ''}>
      <button className="row" onClick={onClick}>
        <span className="row-idx pixel">{isCurrent && playing ? '▶' : String(index + 1).padStart(2, '0')}</span>
        <span className="row-title">{track.title}</span>
        <span className="row-meta dim">{track.duration}</span>
      </button>
      <StreamLinks spotify={track.spotify_url} apple={track.apple_url} />
    </li>
  )
}
