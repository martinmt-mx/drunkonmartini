// Mismas formas que devuelve la API de Rails (snake_case).

export type Track = {
  id: number
  title: string
  duration: string
  audio_url: string | null
  bpm: number | null
  root_note: number | null
}

export type Release = {
  id: number
  title: string
  kind: 'album' | 'ep' | 'single'
  year: number
  era: string
  description: string
  cover_from: string
  cover_to: string
  tracks: Track[]
}

export type Beat = {
  id: number
  title: string
  bpm: number
  musical_key: string
  moods: string[]
  audio_url: string | null
  price_lease: number
  price_exclusive: number
  root_note: number | null
}

export type MessageKind = 'booking' | 'beat' | 'colab' | 'guestbook'

/** Lo que el reproductor global sabe reproducir. */
export type Playable = {
  key: string
  title: string
  subtitle: string
  side: Side
  audioUrl: string | null
  bpm: number
  rootNote: number
}

export type Side = 'a' | 'b'
