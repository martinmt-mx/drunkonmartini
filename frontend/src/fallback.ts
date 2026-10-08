import type { Beat, Credit, Release, SceneArtist } from './types'

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
    "artists": "W. Ortiz & EMEH.",
    "role": "producción",
    "release_date": "2026-08-27",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ce/61/91/ce6191c2-d7b0-5fd4-9062-259381eb353f/1963624925212_cover.png/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/40/b2/6c/40b26c6c-62ec-b8a5-cb71-f4dd17754eb1/mzaf_12562499338532986569.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/blessed/6802462909?i=6802462911&uo=4",
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
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d0/67/20/d06720c5-ab69-abbb-eb5f-cc14a83d383b/199891387724_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7a/2d/46/7a2d46dc-e79f-0207-091f-72b69f033e5e/mzaf_4995520592407451345.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/lonely/1869093810?i=1869094146&uo=4",
    "spotify_url": "https://open.spotify.com/track/0s9l0EQmds60BEfTk2Jlry"
  },
  {
    "id": 6,
    "title": "LIVE MY LIFE",
    "artists": "Jeune",
    "role": "producción",
    "release_date": "2026-02-05",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d0/67/20/d06720c5-ab69-abbb-eb5f-cc14a83d383b/199891387724_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/52/c7/ed/52c7ed7f-2589-d5c6-883e-5589a462f3f5/mzaf_14847832687717242180.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/live-my-life/1869093810?i=1869094149&uo=4",
    "spotify_url": "https://open.spotify.com/track/4XuLlXELFyjnsCR51WnPot"
  },
  {
    "id": 18,
    "title": "INNEDIT (feat. Beto Reyes)",
    "artists": "Cotxrrito",
    "role": "producción",
    "release_date": "2025-12-17",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ef/f3/56/eff3560c-0153-d2e6-9a06-44e2bc133817/artwork.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/19/3d/ef/193def70-aafe-67be-d915-ec58dbecf780/mzaf_13667298183099937074.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/innedit-feat-beto-reyes/1862659589?i=1862659650&uo=4",
    "spotify_url": "https://open.spotify.com/track/1J3wGG7gHa0BeZUfTMTarN"
  },
  {
    "id": 3,
    "title": "BLACK WIDOW",
    "artists": "Jeune",
    "role": "producción",
    "release_date": "2025-09-06",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3d/8d/af/3d8dafd0-a577-7cb4-063c-2f2a888cca18/199502237875_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/69/9e/d1/699ed183-a508-e052-f536-aee0e1e0907f/mzaf_11948199989726084403.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/black-widow/1833796840?i=1833796841&uo=4",
    "spotify_url": "https://open.spotify.com/track/0bqu72EX1yqhjEMy1UWv0d"
  },
  {
    "id": 9,
    "title": "Michael Scott",
    "artists": "PandaCano & Fery",
    "role": "producción",
    "release_date": "2025-09-04",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c9/8c/42/c98c42d4-c2ab-6325-0734-3efcc42b85d1/95632.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f5/bb/87/f5bb8748-7fb2-9dac-3ae6-38c75b2148d7/mzaf_16616140474502131026.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/michael-scott/1831853885?i=1831853887&uo=4",
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
    "artists": "Falcon Music, Kiatra & Martini",
    "role": "producción",
    "release_date": "2024-09-03",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ef/82/a2/ef82a289-74ba-74a9-86c3-5a1c4de3f57e/73360.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e9/25/74/e92574ef-a2f2-518f-0680-419956ba9ee4/mzaf_5447803826735706009.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/kiatra-falcon-music-sessions-3/1765565649?i=1765565652&uo=4",
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

export const fallbackScene: SceneArtist[] = [
  {
    "id": 1,
    "name": "PandaCano",
    "genre": "rap",
    "links": {},
    "track_title": "Labios Carmesí",
    "release_date": "2026-07-30",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/16/d9/ea/16d9eafa-c3b8-7211-697d-09e1fae9e434/117377.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b8/9a/10/b89a10ab-4962-0eed-f41b-4c6733108f75/mzaf_705106676395365574.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/labios-carmes%C3%AD/6788219700?i=6788219701&uo=4",
    "apple_artist_url": "https://music.apple.com/mx/artist/pandacano/1802738867?uo=4",
    "spotify_url": "https://open.spotify.com/artist/0hBJWOdDDK8C3S9H98xipW",
    "instagram_url": "https://www.instagram.com/pandacano/"
  },
  {
    "id": 2,
    "name": "W. Ortiz",
    "genre": "reggaetón",
    "links": {},
    "track_title": "La Botella",
    "release_date": "2024-08-13",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/15/54/1e/15541e54-1ac7-e4a0-4c45-70658e7230a7/1963622397882_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/61/21/7c/61217c30-f42f-68de-16b4-f84ac275bbd7/mzaf_9052285901554389487.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/la-botella/1762700133?i=1762700137&uo=4",
    "apple_artist_url": "https://music.apple.com/mx/artist/w-ortiz/1138977421?uo=4",
    "spotify_url": "https://open.spotify.com/artist/09wZVcOKgB59Ew0R8yWe3Z",
    "instagram_url": "https://www.instagram.com/wortizoficial/"
  },
  {
    "id": 3,
    "name": "Jeune",
    "genre": "pluggnb",
    "links": {},
    "track_title": "LONELY",
    "release_date": "2026-02-05",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d0/67/20/d06720c5-ab69-abbb-eb5f-cc14a83d383b/199891387724_cover.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7a/2d/46/7a2d46dc-e79f-0207-091f-72b69f033e5e/mzaf_4995520592407451345.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/lonely/1869093810?i=1869094146&uo=4",
    "apple_artist_url": "https://music.apple.com/mx/artist/jeune/1592377220?uo=4",
    "spotify_url": "https://open.spotify.com/artist/7zPWsZXnCK7PPtA1iJkdJs",
    "instagram_url": "https://www.instagram.com/jeune_music/"
  },
  {
    "id": 4,
    "name": "laylattice",
    "genre": "electrónica",
    "links": {},
    "track_title": "Viva Colima (feat. Laylattice)",
    "release_date": "2026-04-03",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d9/2e/ac/d92eac5b-0e5a-4454-62bb-0071ed13d1f4/810168085869.png/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3f/7b/8c/3f7b8c22-f046-f8f0-a1b4-228090ee479c/mzaf_6577336310904423944.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/viva-colima-feat-laylattice/1886182087?i=1886182088&uo=4",
    "apple_artist_url": "https://music.apple.com/mx/artist/1785217677",
    "spotify_url": "https://open.spotify.com/artist/5KOFMADPvNFrtVID0uxMdU",
    "instagram_url": "https://www.instagram.com/laylattice/"
  },
  {
    "id": 5,
    "name": "EMEH.",
    "genre": "trap experimental",
    "links": {},
    "track_title": "ETERNAL",
    "release_date": "2026-02-27",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7b/03/11/7b03110f-319c-4cde-4280-d39c7b357bf2/artwork.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/04/4f/7d/044f7d36-167b-9bcd-afb9-52ebb3246c56/mzaf_17219512193810816636.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/eternal/1875122999?i=1875123012&uo=4",
    "apple_artist_url": "https://music.apple.com/mx/artist/emeh/1653443509?uo=4",
    "spotify_url": "https://open.spotify.com/artist/77LDXwct9zyAuRXdy1x4MV",
    "instagram_url": "https://www.instagram.com/emeh.222/"
  },
  {
    "id": 6,
    "name": "Fernando Pedroza",
    "genre": "indie",
    "links": {},
    "track_title": "Manzanillo (Demo)",
    "release_date": "2026-09-04",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/14/bb/f3/14bbf361-05d8-2408-486f-fae341f18dc8/885000325427.png/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c4/71/52/c471528c-6416-da21-e362-146116439112/mzaf_8404076067855513502.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/manzanillo-demo/6806176823?i=6806177027&uo=4",
    "apple_artist_url": "https://music.apple.com/mx/artist/fernando-pedroza/1745575888?uo=4",
    "spotify_url": "https://open.spotify.com/artist/0ZipFPSwHeDvell6L5WfkZ",
    "instagram_url": "https://www.instagram.com/soyfernandopedroza/"
  },
  {
    "id": 7,
    "name": "Sweetjay",
    "genre": "urbano",
    "links": {},
    "track_title": "TODA LA NOCHE",
    "release_date": "2026-08-24",
    "artwork_url": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/08/0e/30/080e3025-0c99-e2db-8280-7dc4ca1af20f/artwork.jpg/600x600bb.jpg",
    "preview_url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2f/4f/d2/2f4fd2d0-194d-dbe4-a495-78678756d0ab/mzaf_13508384738268066503.plus.aac.p.m4a",
    "apple_url": "https://music.apple.com/mx/album/toda-la-noche/6814056857?i=6814056864&uo=4",
    "apple_artist_url": "https://music.apple.com/mx/artist/sweetjay/1713051475?uo=4",
    "spotify_url": "https://open.spotify.com/artist/3iRxXFhGui4HYHDrhgWgr9",
    "instagram_url": "https://www.instagram.com/s.weet.jay/"
  }
]

export const fallbackBeats: Beat[] = [
  {
    "id": 30,
    "title": "Luces de la Ciudad - BB028",
    "bpm": 89,
    "musical_key": "F# min",
    "audio_url": "/audio/beats/bb028.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "pop"
    ]
  },
  {
    "id": 31,
    "title": "Asfalto - BB005",
    "bpm": 85,
    "musical_key": "F# min",
    "audio_url": "/audio/beats/bb005.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "rap"
    ]
  },
  {
    "id": 32,
    "title": "Sin Señal - AA031",
    "bpm": 137,
    "musical_key": "C# min",
    "audio_url": "/audio/beats/aa031.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "trap"
    ]
  },
  {
    "id": 33,
    "title": "Dos Caras - AA019",
    "bpm": 157,
    "musical_key": "G min",
    "audio_url": "/audio/beats/aa019.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "rap",
      "trap"
    ]
  },
  {
    "id": 34,
    "title": "Neón - AA012",
    "bpm": 98,
    "musical_key": "D min",
    "audio_url": "/audio/beats/aa012.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "trap"
    ]
  },
  {
    "id": 35,
    "title": "Cristal Roto - AA004",
    "bpm": 131,
    "musical_key": "G min",
    "audio_url": "/audio/beats/aa004.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "trap"
    ]
  },
  {
    "id": 36,
    "title": "Oro - PRY79",
    "bpm": 150,
    "musical_key": "E maj",
    "audio_url": "/audio/beats/pry79.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "trap"
    ]
  },
  {
    "id": 37,
    "title": "Después de las 3",
    "bpm": 145,
    "musical_key": "Eb min",
    "audio_url": "/audio/beats/rnb73.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "trap"
    ]
  },
  {
    "id": 38,
    "title": "Última Ronda",
    "bpm": 128,
    "musical_key": "G min",
    "audio_url": "/audio/beats/rnb85.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "trap"
    ]
  },
  {
    "id": 39,
    "title": "Peor que Ayer",
    "bpm": 79,
    "musical_key": "F min",
    "audio_url": "/audio/beats/rnb21-2.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "trap"
    ]
  },
  {
    "id": 40,
    "title": "Humo Blanco",
    "bpm": 130,
    "musical_key": "B min",
    "audio_url": "/audio/beats/rnb13.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "trap"
    ]
  },
  {
    "id": 41,
    "title": "Calle 52",
    "bpm": 90,
    "musical_key": "A min",
    "audio_url": "/audio/beats/rnb52.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "rap"
    ]
  },
  {
    "id": 42,
    "title": "Vaso Medio Lleno",
    "bpm": 65,
    "musical_key": "Ab maj",
    "audio_url": "/audio/beats/rnb9-2.mp3",
    "price_lease": null,
    "price_exclusive": null,
    "root_note": null,
    "moods": [
      "rap"
    ]
  }
]
