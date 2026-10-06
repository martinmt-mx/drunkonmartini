# Beats de ejemplo para drunkonmartini. Se puede correr varias veces:
# borra y vuelve a crear los beats.
#
# Tus canciones (Lado A) NO vienen de aquí: se descargan de Apple Music con
#   bin/rails music:sync
#
# root_note = nota MIDI raíz para el sintetizador demo del frontend
# (se usa sólo mientras audio_url esté vacío).

Beat.delete_all

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

puts "Seeds: #{Beat.count} beats (corre bin/rails music:sync para tus canciones)"
