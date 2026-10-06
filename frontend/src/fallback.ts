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
    "id": 16,
    "title": "Falso Amor",
    "artists": "Ander",
    "role": "producción",
    "release_date": "2026-09-03",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dd/f6/7f/ddf67ff1-f269-b80f-3048-8590d5530903/1963624845237_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b8/39/4c/b8394ccc-4c51-7e1c-dbde-102089b2ac5c/mzaf_2792422705485974660.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/falso-amor/6794922802?i=6794922804&uo=4",
    "spotify_url": "https://open.spotify.com/track/2a0jsWGPKOhwCCoFp46IyT"
  },
  {
    "id": 11,
    "title": "Blessed",
    "artists": "W.Ortiz, EMEH.",
    "role": "producción",
    "release_date": "2026-08-27",
    "artwork_url": "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e7ae7c8e2d92822236d10cc9",
    "preview_url": null,
    "apple_url": null,
    "spotify_url": "https://open.spotify.com/track/4mT60kIbYc7AyfnmHQKCd9"
  },
  {
    "id": 15,
    "title": "Solo",
    "artists": "Ander",
    "role": "producción",
    "release_date": "2026-08-08",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ec/ec/a6/ececa6d2-3bb8-6f6a-e808-07a02f4350e8/1963624843448_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3b/dd/4f/3bdd4f4b-2c87-b7aa-1e9a-3c87bdcf9d00/mzaf_151119978221286021.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/solo/6798782394?i=6798782395&uo=4",
    "spotify_url": "https://open.spotify.com/track/0Lmlw2Bqog2u3y8t27DXB4"
  },
  {
    "id": 12,
    "title": "Messi Bunker Sesion #28",
    "artists": "El BunkerMX & W. Ortiz",
    "role": "producción",
    "release_date": "2026-08-06",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/50/68/d8/5068d899-2524-25ad-5a2a-48ce28c71cdc/1963624825871_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/71/8b/88/718b88d2-8653-b951-ad71-421038e6d05e/mzaf_12658861162726452579.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/messi-bunker-sesion-28/6793295336?i=6793295339&uo=4",
    "spotify_url": "https://open.spotify.com/track/14ReZNHcLhOWHIT1mgkDea"
  },
  {
    "id": 8,
    "title": "Labios Carmesí",
    "artists": "PandaCano",
    "role": "producción",
    "release_date": "2026-07-30",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/16/d9/ea/16d9eafa-c3b8-7211-697d-09e1fae9e434/117377.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b8/9a/10/b89a10ab-4962-0eed-f41b-4c6733108f75/mzaf_705106676395365574.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/labios-carmes%C3%AD/6788219700?i=6788219701&uo=4",
    "spotify_url": "https://open.spotify.com/track/57UIRcwlkM9jfbjjPnqlT9"
  },
  {
    "id": 17,
    "title": "San Andrés",
    "artists": "Beto Reyes & Edgar Huerta",
    "role": "producción",
    "release_date": "2026-06-11",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7f/88/e7/7f88e7c5-282b-f55e-595f-68beebf01fd4/1963624664678_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d6/cb/e0/d6cbe082-f91e-dc59-e88d-30da0b8021c1/mzaf_17555650115014643291.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/san-andr%C3%A9s/6776245781?i=6776245782&uo=4",
    "spotify_url": "https://open.spotify.com/track/3sow1G6C65FaXS8medZWnG"
  },
  {
    "id": 7,
    "title": "Domingo Por La Noche",
    "artists": "PandaCano",
    "role": "producción",
    "release_date": "2026-04-30",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/43/0d/74/430d74c4-528e-dd43-c847-ae45a304fb72/112278.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2d/fd/4c/2dfd4ccb-93eb-b7f8-b238-b58501f60646/mzaf_10002527232301869379.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/domingo-por-la-noche/1892231707?i=1892231710&uo=4",
    "spotify_url": "https://open.spotify.com/track/4SGaU7b32xm9XOt1x3U3QA"
  },
  {
    "id": 14,
    "title": "Viva Colima (feat. Laylattice)",
    "artists": "Bok Nero",
    "role": "producción",
    "release_date": "2026-04-03",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d9/2e/ac/d92eac5b-0e5a-4454-62bb-0071ed13d1f4/810168085869.png/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3f/7b/8c/3f7b8c22-f046-f8f0-a1b4-228090ee479c/mzaf_6577336310904423944.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/viva-colima-feat-laylattice/1886182087?i=1886182088&uo=4",
    "spotify_url": "https://open.spotify.com/track/1q2nxGd0qoubvfBKZ4fbK6"
  },
  {
    "id": 4,
    "title": "LONELY",
    "artists": "Jeune",
    "role": "producción",
    "release_date": "2026-02-05",
    "artwork_url": "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020ea770e3f4a3e754cbffea22",
    "preview_url": null,
    "apple_url": null,
    "spotify_url": "https://open.spotify.com/track/0s9l0EQmds60BEfTk2Jlry"
  },
  {
    "id": 6,
    "title": "LIVE MY LIFE",
    "artists": "Jeune",
    "role": "producción",
    "release_date": "2026-02-05",
    "artwork_url": "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e020ea770e3f4a3e754cbffea22",
    "preview_url": null,
    "apple_url": null,
    "spotify_url": "https://open.spotify.com/track/4XuLlXELFyjnsCR51WnPot"
  },
  {
    "id": 18,
    "title": "INNEDIT",
    "artists": "Cotxrrito, Beto Reyes",
    "role": "producción",
    "release_date": "2025-12-17",
    "artwork_url": "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0221a7ead3549b574003a7d9dc",
    "preview_url": null,
    "apple_url": null,
    "spotify_url": "https://open.spotify.com/track/1J3wGG7gHa0BeZUfTMTarN"
  },
  {
    "id": 3,
    "title": "BLACK WIDOW",
    "artists": "Jeune",
    "role": "producción",
    "release_date": "2025-09-06",
    "artwork_url": "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e021c35c6e48f249b18d3449a4f",
    "preview_url": null,
    "apple_url": null,
    "spotify_url": "https://open.spotify.com/track/0bqu72EX1yqhjEMy1UWv0d"
  },
  {
    "id": 9,
    "title": "Michael Scott",
    "artists": "PandaCano, Fery",
    "role": "producción",
    "release_date": "2025-09-04",
    "artwork_url": "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022e57af2aa0864a782682b68a",
    "preview_url": null,
    "apple_url": null,
    "spotify_url": "https://open.spotify.com/track/5SoKTZrAQEstcoDnr5ubeS"
  },
  {
    "id": 13,
    "title": "Cachondeo",
    "artists": "Duvi Perro",
    "role": "producción",
    "release_date": "2025-07-16",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f2/ef/d3/f2efd32e-fa46-72af-9745-f9eff84ebeb3/1963623530462_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b5/39/59/b53959b7-23db-db24-dc5b-7e6092cd39fb/mzaf_16333145755571189703.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/cachondeo/1825700454?i=1825700458&uo=4",
    "spotify_url": "https://open.spotify.com/track/5055tq8WBR6V9xmVDG47LM"
  },
  {
    "id": 10,
    "title": "Momentum",
    "artists": "Kiatra",
    "role": "producción",
    "release_date": "2025-05-16",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4d/fd/16/4dfd1685-33aa-09a9-1b4e-86fa7089de35/cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/54/f8/59/54f859f3-255e-6a8c-051e-8a133be4b9a7/mzaf_16835849291060815629.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/momentum/1830883193?i=1830883194&uo=4",
    "spotify_url": "https://open.spotify.com/track/6hZUp1aRe0bUKpBgmW1EA8"
  },
  {
    "id": 5,
    "title": "Otro Tema",
    "artists": "Jeune",
    "role": "producción",
    "release_date": "2025-05-10",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d0/67/20/d06720c5-ab69-abbb-eb5f-cc14a83d383b/199891387724_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5f/60/43/5f604311-5933-d8fb-795c-d97e1b78f894/mzaf_8931930166168528689.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/otro-tema/1869093810?i=1869094160&uo=4",
    "spotify_url": "https://open.spotify.com/track/7BVTeepbhCki0r7yEUmBgN"
  },
  {
    "id": 2,
    "title": "KIATRA: Falcon Music Sessions #3",
    "artists": "Falcon Music, Kiatra, Martini",
    "role": "producción",
    "release_date": "2024-09-03",
    "artwork_url": "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022af62aa1974e1e2d1451bbc8",
    "preview_url": null,
    "apple_url": null,
    "spotify_url": "https://open.spotify.com/track/1W4GmgVyjAuY18MpXJNX0p"
  },
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
