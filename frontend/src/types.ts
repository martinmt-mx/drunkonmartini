// Mismas formas que devuelve la API de Rails (snake_case).

export type Track = {
  id: number
  title: string
  duration: string
  audio_url: string | null
  preview_url: string | null
  apple_url: string | null
  spotify_url: string | null
  bpm: number | null
  root_note: number | null
}

export type Release = {
  id: number
  title: string
  kind: 'album' | 'ep' | 'single'
  year: number
  release_date: string | null
  era: string | null
  description: string | null
  cover_from: string | null
  cover_to: string | null
  artwork_url: string | null
  apple_url: string | null
  spotify_url: string | null
  tracks: Track[]
}

/** Canción de otro artista donde participé en la producción. */
export type Credit = {
  id: number
  title: string
  artists: string | null
  role: string
  release_date: string | null
  artwork_url: string | null
  preview_url: string | null
  apple_url: string | null
  spotify_url: string | null
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
  /** true cuando audioUrl es un preview de 30 s de Apple Music. */
  isPreview?: boolean
  bpm: number
  rootNote: number
}

export type Side = 'a' | 'b'
