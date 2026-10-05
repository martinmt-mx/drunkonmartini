import { useMemo, useState } from 'react'
import { profile } from '../profile'
import type { Beat } from '../types'
import { usePlayer } from '../player/PlayerContext'
import { Win } from './Win'

type Sort = 'nuevo' | 'bpm-asc' | 'bpm-desc'

export function ProducerSide({ beats, onLicense }: { beats: Beat[]; onLicense: (beat: Beat) => void }) {
  const [query, setQuery] = useState('')
  const [mood, setMood] = useState<string | null>(null)
  const [sort, setSort] = useState<Sort>('nuevo')

  const moods = useMemo(() => [...new Set(beats.flatMap((b) => b.moods))].sort(), [beats])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = beats.filter(
      (b) =>
        (!mood || b.moods.includes(mood)) &&
        (!q || b.title.toLowerCase().includes(q) || b.musical_key.toLowerCase().includes(q) || String(b.bpm) === q),
    )
    if (sort === 'bpm-asc') list.sort((a, b) => a.bpm - b.bpm)
    if (sort === 'bpm-desc') list.sort((a, b) => b.bpm - a.bpm)
    return list
  }, [beats, mood, query, sort])

  return (
    <div className="side-grid">
      <Win title="leeme.txt" className="span-2">
        <p className="bio">{profile.sides.b.bio}</p>
      </Win>

      <Win title={`C:\\beats\\  —  ${visible.length} de ${beats.length}`} className="span-2">
        <div className="filters">
          <input
            className="input"
            type="search"
            placeholder="buscar: nombre, tonalidad o bpm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar beats"
          />
          <select className="input" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Ordenar">
            <option value="nuevo">más nuevos</option>
            <option value="bpm-asc">bpm ↑</option>
            <option value="bpm-desc">bpm ↓</option>
          </select>
        </div>
        <div className="chips">
          <button className={`chip ${mood === null ? 'on' : ''}`} onClick={() => setMood(null)}>todos</button>
          {moods.map((m) => (
            <button key={m} className={`chip ${mood === m ? 'on' : ''}`} onClick={() => setMood(mood === m ? null : m)}>
              #{m}
            </button>
          ))}
        </div>

        <div className="beats" role="table" aria-label="Beats">
          <div className="beats-head dim pixel" role="row">
            <span />
            <span>nombre</span>
            <span>bpm</span>
            <span>key</span>
            <span>mood</span>
            <span />
          </div>
          {visible.map((b) => (
            <BeatRow key={b.id} beat={b} onLicense={() => onLicense(b)} />
          ))}
          {visible.length === 0 && <p className="dim empty">nada por aquí. prueba otro filtro.</p>}
        </div>
      </Win>
    </div>
  )
}

function BeatRow({ beat, onLicense }: { beat: Beat; onLicense: () => void }) {
  const { current, playing, play, toggle } = usePlayer()
  const key = `b${beat.id}`
  const isCurrent = current?.key === key

  const onPlay = () =>
    isCurrent
      ? toggle()
      : play({
          key,
          title: beat.title,
          subtitle: `${beat.bpm} bpm · ${beat.musical_key}`,
          side: 'b',
          audioUrl: beat.audio_url,
          bpm: beat.bpm,
          rootNote: beat.root_note ?? 57,
        })

  return (
    <div className={`beat ${isCurrent ? 'playing' : ''}`} role="row">
      <button className="play" onClick={onPlay} aria-label={`${isCurrent && playing ? 'Pausar' : 'Reproducir'} ${beat.title}`}>
        {isCurrent && playing ? '❚❚' : '▶'}
      </button>
      <span className="beat-title">{beat.title}</span>
      <span className="pixel">{beat.bpm}</span>
      <span className="pixel">{beat.musical_key}</span>
      <span className="beat-moods dim">{beat.moods.map((m) => `#${m}`).join(' ')}</span>
      <button className="license" onClick={onLicense}>
        desde ${beat.price_lease}
      </button>
    </div>
  )
}
