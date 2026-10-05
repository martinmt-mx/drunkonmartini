import type { Beat, Release } from './types'

// Copia mínima de db/seeds.rb para cuando la API no está disponible.

const t = (id: number, title: string, duration: string, bpm: number, root_note: number) => ({
  id, title, duration, bpm, root_note, audio_url: null,
})

export const fallbackReleases: Release[] = [
  {
    id: 1, title: 'After Hours en el Lobby', kind: 'ep', year: 2024, era: 'era 01 · r&b nocturno',
    description: 'Neones, autopista y llamadas perdidas a las 3am.',
    cover_from: '#ff2a3d', cover_to: '#1a0006',
    tracks: [
      t(1, 'Intro (vaso vacío)', '1:42', 72, 57),
      t(2, 'Luces rojas', '3:21', 96, 57),
      t(3, 'No contestes', '3:05', 88, 55),
      t(4, 'Hotel sin nombre', '4:10', 80, 53),
    ],
  },
  {
    id: 2, title: 'Martini Seco', kind: 'single', year: 2025, era: 'era 01 · r&b nocturno',
    description: 'Single. Dos hielos, nada de azúcar.',
    cover_from: '#c0c6d0', cover_to: '#0b0c10',
    tracks: [t(5, 'Martini Seco', '2:58', 100, 52)],
  },
  {
    id: 3, title: '???', kind: 'album', year: 2026, era: 'era 02 · en transición',
    description: 'Algo está cambiando. Próximamente.',
    cover_from: '#3d5cff', cover_to: '#05030f',
    tracks: [t(6, 'Señal 01 (preview)', '0:30', 110, 50)],
  },
]

const b = (id: number, title: string, bpm: number, musical_key: string, moods: string[], root_note: number): Beat => ({
  id, title, bpm, musical_key, moods, root_note, audio_url: null, price_lease: 30, price_exclusive: 300,
})

export const fallbackBeats: Beat[] = [
  b(1, 'Siempre de noche', 92, 'A min', ['dark', 'rnb', 'slow'], 57),
  b(2, 'Cristal', 140, 'F# min', ['trap', 'dark'], 54),
  b(3, 'Velvet 3AM', 84, 'D min', ['rnb', 'smooth'], 50),
  b(4, 'Autopista', 118, 'C min', ['synthwave', '80s'], 48),
  b(5, 'Mensajes en visto', 75, 'E min', ['rnb', 'sad', 'slow'], 52),
  b(6, 'Club cerrado', 128, 'G min', ['dance', '80s'], 55),
  b(7, 'Humo', 145, 'B min', ['trap', 'sad'], 59),
  b(8, 'Seda', 90, 'Bb min', ['rnb', 'smooth'], 58),
]
