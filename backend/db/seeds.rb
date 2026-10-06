# Beats a la venta (Lado B). Se puede correr varias veces: borra y vuelve a crear los beats.
#
# Tus canciones (Lado A) y créditos de producción NO vienen de aquí: se descargan con
#   bin/rails music:sync
#
# audio_url: preview de 60 s en frontend/public/audio/beats/ (los WAV originales no se suben).
# bpm y musical_key se detectaron automáticamente con librosa: revísalos contra tu proyecto de FL.
# Precios en nil = el sitio muestra "cotizar" y lleva al formulario de contacto.

Beat.delete_all

# [título en el sitio, archivo original, bpm, tonalidad, moods]
# El orden es del más nuevo al más viejo (fecha de los WAV).
beats = [
  [ "Luces de la Ciudad - BB028", "BB028",   89, "F# min", "pop" ],
  [ "Asfalto - BB005",            "BB005",   85, "F# min", "rap" ],
  [ "Sin Señal - AA031",          "AA031",  137, "C# min", "trap" ],
  [ "Dos Caras - AA019",          "AA019",  157, "G min",  "rap,trap" ],
  [ "Neón - AA012",               "AA012",   98, "D min",  "trap" ],
  [ "Cristal Roto - AA004",       "AA004",  131, "G min",  "trap" ],
  [ "Oro - PRY79",                "PRY79",  150, "E maj",  "trap" ],
  [ "Después de las 3",           "RnB73",  145, "Eb min", "trap" ],
  [ "Última Ronda",               "RnB85",  128, "G min",  "trap" ],
  [ "Peor que Ayer",              "RnB21_2", 79, "F min",  "trap,tipo bad bunny" ],
  [ "Humo Blanco",                "RnB13",  130, "B min",  "trap" ],
  [ "Calle 52",                   "RnB52",   90, "A min",  "rap" ],
  [ "Vaso Medio Lleno",           "RnB9-2",  65, "Ab maj", "rap" ]
]

beats.each_with_index do |(title, file, bpm, key, moods), i|
  slug = file.downcase.tr("_", "-")
  Beat.create!(title:, bpm:, musical_key: key, moods:,
               audio_url: "/audio/beats/#{slug}.mp3",
               price_lease: nil, price_exclusive: nil, available: true, position: i)
end

puts "Seeds: #{Beat.count} beats (corre bin/rails music:sync para tus canciones)"
