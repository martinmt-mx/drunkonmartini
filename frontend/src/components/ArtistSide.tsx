import { useState } from 'react'
import { profile } from '../profile'
import type { Release, Track } from '../types'
import { usePlayer } from '../player/PlayerContext'
import { Win } from './Win'

const KIND_LABEL = { album: 'Álbum', ep: 'EP', single: 'Single' } as const

export function ArtistSide({ releases }: { releases: Release[] }) {
  const [openId, setOpenId] = useState<number | null>(releases[0]?.id ?? null)
  const open = releases.find((r) => r.id === openId) ?? releases[0]
  const eras = [...new Set(releases.map((r) => r.era))]

  return (
    <div className="side-grid">
      <Win title="leeme.txt" className="span-2">
        <p className="bio">{profile.sides.a.bio}</p>
        <ol className="eras">
          {eras.map((era, i) => (
            <li key={era} className={i === eras.length - 1 ? 'current' : ''}>
              <span className="pixel">{era}</span>
            </li>
          ))}
        </ol>
      </Win>

      <Win title={`discografia/ (${releases.length})`} className="span-2">
        <ul className="releases">
          {releases.map((r) => (
            <li key={r.id}>
              <button
                className={`release ${open?.id === r.id ? 'on' : ''}`}
                onClick={() => setOpenId(r.id)}
              >
                <Cover release={r} />
                <span className="release-title">{r.title}</span>
                <span className="release-meta dim">{KIND_LABEL[r.kind]} · {r.year}</span>
              </button>
            </li>
          ))}
        </ul>
      </Win>

      {open && (
        <Win title={`${open.title}.m3u`} className="span-2" aside={<span className="dim">{open.era}</span>}>
          <div className="tracklist-head">
            <Cover release={open} big />
            <div>
              <h3 className="serif">{open.title}</h3>
              <p className="dim">{open.description}</p>
            </div>
          </div>
          <ol className="tracklist">
            {open.tracks.map((t, i) => (
              <TrackRow key={t.id} track={t} index={i} release={open} />
            ))}
          </ol>
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
          audioUrl: track.audio_url,
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
    </li>
  )
}

function Cover({ release, big = false }: { release: Release; big?: boolean }) {
  return (
    <span
      className={`cover ${big ? 'big' : ''}`}
      style={{ background: `radial-gradient(circle at 30% 25%, ${release.cover_from}, ${release.cover_to} 70%)` }}
      aria-hidden
    >
      <span className="cover-mark pixel">{release.title === '???' ? '?' : release.title[0]}</span>
    </span>
  )
}
