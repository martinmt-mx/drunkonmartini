import type { Beat, Credit, Release } from './types'

// Copia de la API para cuando Rails no está disponible.
// Releases y créditos: salida de `bin/rails music:sync` (GET /api/releases, /api/credits).

export const fallbackReleases: Release[] = [
  {
    "id": 7,
    "title": "Todo Bien?",
    "kind": "ep",
    "year": 2026,
    "release_date": "2026-08-14",
    "era": null,
    "description": null,
    "cover_from": null,
    "cover_to": null,
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/08/ac/11/08ac119e-0f32-133d-7f60-ded06014a7b2/1963624842779_cover.jpg/600x600bb.jpg",
    "apple_url": "https://music.apple.com/mx/album/fuego/6794921071",
    "spotify_url": "https://open.spotify.com/artist/5bOjTZCohwu1EQ7BHcq2sK",
    "tracks": [
      {
        "id": 13,
        "title": "Todo Bien?",
        "duration": "3:41",
        "audio_url": null,
        "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/31/32/f7/3132f7ad-f627-6a87-bb4a-fb09624f0f85/mzaf_7863662489854134622.plus.aac.p.m4a",
        "apple_url": "https://music.apple.com/mx/album/todo-bien/6794921071?i=6794921072&uo=4",
        "spotify_url": "https://open.spotify.com/track/6HGvHHQPCkGmbiL8l6iFPM",
        "bpm": null,
        "root_note": null
      },
      {
        "id": 14,
        "title": "Fuego",
        "duration": "4:32",
        "audio_url": null,
        "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/77/e7/dd/77e7dd3c-bbba-9669-2219-63cd474da634/mzaf_12411315361033413001.plus.aac.p.m4a",
        "apple_url": "https://music.apple.com/mx/album/fuego/6794921071?i=6794921074&uo=4",
        "spotify_url": "https://open.spotify.com/track/5bgbRVKV3ZHdx0rabAb5yN",
        "bpm": null,
        "root_note": null
      },
      {
        "id": 15,
        "title": "Tentación",
        "duration": "3:14",
        "audio_url": null,
        "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bf/26/02/bf26025e-b943-f2cc-216e-8c15603909f8/mzaf_17319996915704854024.plus.aac.p.m4a",
        "apple_url": "https://music.apple.com/mx/album/tentaci%C3%B3n/6794921071?i=6794921075&uo=4",
        "spotify_url": "https://open.spotify.com/track/4sMaXz2Yc2nDn6xanWR0m8",
        "bpm": null,
        "root_note": null
      },
      {
        "id": 16,
        "title": "Perfume",
        "duration": "3:03",
        "audio_url": null,
        "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/19/3f/16/193f16ce-2e31-7ac3-d5f9-744e7da17d62/mzaf_5983104721241479859.plus.aac.p.m4a",
        "apple_url": "https://music.apple.com/mx/album/perfume/6794921071?i=6794921076&uo=4",
        "spotify_url": "https://open.spotify.com/track/2FkaPxj0Eg0p8R0806tu4n",
        "bpm": null,
        "root_note": null
      },
      {
        "id": 17,
        "title": "Esta Noche",
        "duration": "4:29",
        "audio_url": null,
        "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/20/2c/b2/202cb275-20ee-fa7a-cd5a-5854ae7808b2/mzaf_3674484709158307993.plus.aac.p.m4a",
        "apple_url": "https://music.apple.com/mx/album/esta-noche/6794921071?i=6794921077&uo=4",
        "spotify_url": "https://open.spotify.com/track/3ACikcrlzyKyBLPBCl9x00",
        "bpm": null,
        "root_note": null
      }
    ]
  },
  {
    "id": 8,
    "title": "Rendido",
    "kind": "single",
    "year": 2025,
    "release_date": "2025-07-31",
    "era": null,
    "description": null,
    "cover_from": null,
    "cover_to": null,
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/cb/7b/3a/cb7b3a58-0673-237d-39de-15f39fc9129b/1963623612441_cover.jpg/600x600bb.jpg",
    "apple_url": "https://music.apple.com/mx/album/rendido/1830097391",
    "spotify_url": "https://open.spotify.com/artist/5bOjTZCohwu1EQ7BHcq2sK",
    "tracks": [
      {
        "id": 18,
        "title": "Rendido",
        "duration": "3:22",
        "audio_url": null,
        "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/93/72/2c/93722c58-18b5-1d55-d464-f7fe5f02d3e4/mzaf_7865676880235617857.plus.aac.p.m4a",
        "apple_url": "https://music.apple.com/mx/album/rendido/1830097391?i=1830097392&uo=4",
        "spotify_url": "https://open.spotify.com/track/43ZioFDBOYQkENCsqxFxpF",
        "bpm": null,
        "root_note": null
      }
    ]
  }
]

export const fallbackCredits: Credit[] = [
  {
    "id": 1,
    "title": "JEUNE: Falcon Music Sessions #2",
    "artists": "Falcon Music, Jeune & Martini",
    "role": "producción",
    "release_date": "2024-07-11",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/51/27/7f/51277faa-3cc4-ea66-7949-d7086114d199/70487.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0a/7b/c5/0a7bc594-179a-3772-0f51-64d7e68a5251/mzaf_12938987048223602183.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/jeune-falcon-music-sessions-2/1754427871?i=1754427872&uo=4",
    "spotify_url": "https://open.spotify.com/track/6sDaWOWAvRMhdw3l7FD8dm"
  },
  {
    "id": 2,
    "title": "KIATRA: Falcon Music Sessions #3",
    "artists": "Falcon Music, Kiatra, Martini",
    "role": "producción",
    "release_date": null,
    "artwork_url": "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022af62aa1974e1e2d1451bbc8",
    "preview_url": null,
    "apple_url": null,
    "spotify_url": "https://open.spotify.com/track/1W4GmgVyjAuY18MpXJNX0p"
  }
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
