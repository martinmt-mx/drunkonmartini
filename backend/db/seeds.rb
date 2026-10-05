# Datos de ejemplo para drunkonmartini. Reemplázalos con tu música real.
# Se puede correr varias veces: borra y vuelve a crear todo.
#
# root_note = nota MIDI raíz para el sintetizador demo del frontend
# (se usa sólo mientras audio_url esté vacío).

Track.delete_all
Release.delete_all
Beat.delete_all

releases = [
  {
    title: "After Hours en el Lobby", kind: "ep", year: 2024, era: "era 01 · r&b nocturno",
    description: "Neones, autopista y llamadas perdidas a las 3am.",
    cover_from: "#ff2a3d", cover_to: "#1a0006",
    tracks: [
      [ "Intro (vaso vacío)", "1:42", 72, 57 ],
      [ "Luces rojas", "3:21", 96, 57 ],
      [ "No contestes", "3:05", 88, 55 ],
      [ "Hotel sin nombre", "4:10", 80, 53 ]
    ]
  },
  {
    title: "Martini Seco", kind: "single", year: 2025, era: "era 01 · r&b nocturno",
    description: "Single. Dos hielos, nada de azúcar.",
    cover_from: "#c0c6d0", cover_to: "#0b0c10",
    tracks: [ [ "Martini Seco", "2:58", 100, 52 ] ]
  },
  {
    title: "???", kind: "album", year: 2026, era: "era 02 · en transición",
    description: "Algo está cambiando. Próximamente.",
    cover_from: "#3d5cff", cover_to: "#05030f",
    tracks: [ [ "Señal 01 (preview)", "0:30", 110, 50 ] ]
  }
]

releases.each_with_index do |data, i|
  tracks = data.delete(:tracks)
  release = Release.create!(data.merge(position: i))
  tracks.each_with_index do |(title, duration, bpm, root), j|
    release.tracks.create!(title:, duration:, bpm:, root_note: root, position: j)
  end
end

beats = [
  [ "Siempre de noche", 92, "A min", "dark,rnb,slow" ],
  [ "Cristal", 140, "F# min", "trap,dark" ],
  [ "Velvet 3AM", 84, "D min", "rnb,smooth" ],
  [ "Autopista", 118, "C min", "synthwave,80s" ],
  [ "Mensajes en visto", 75, "E min", "rnb,sad,slow" ],
  [ "Club cerrado", 128, "G min", "dance,80s" ],
  [ "Humo", 145, "B min", "trap,sad" ],
  [ "Seda", 90, "Bb min", "rnb,smooth" ]
]

beats.each_with_index do |(title, bpm, key, moods), i|
  root = { "A" => 57, "F#" => 54, "D" => 50, "C" => 48, "E" => 52, "G" => 55, "B" => 59, "Bb" => 58 }[key.split.first]
  Beat.create!(title:, bpm:, musical_key: key, moods:, root_note: root,
               price_lease: 30, price_exclusive: 300, available: true, position: i)
end

puts "Seeds: #{Release.count} releases, #{Track.count} tracks, #{Beat.count} beats"
