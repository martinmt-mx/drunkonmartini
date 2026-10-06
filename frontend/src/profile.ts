// Datos fijos del perfil. Edita aquí tu bio, redes y correo.

export const profile = {
  name: 'drunkonmartini',
  handle: '@drunkonmartini',
  email: 'booking@drunkonmartini.com',
  sides: {
    a: {
      label: 'Lado A',
      role: 'Artista',
      tagline: 'r&b nocturno para cuando ya cerraron el bar',
      bio: 'Canto sobre lo que pasa después de medianoche: neones, llamadas que no contesto y ciudades vistas desde el asiento del copiloto. Ahorita el sonido está cambiando. Lo que sigue no se parece a lo de antes.',
    },
    b: {
      label: 'Lado B',
      role: 'Productor',
      tagline: 'beats oscuros, 808s y sintes de los 80s',
      bio: 'Produzco para artistas de r&b, trap y pop alternativo. Todos los beats se pueden escuchar aquí. Si te late uno, escríbeme para licencia básica o exclusiva. También hago producción a la medida.',
    },
  },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/drunkonmartini' },
    { label: 'Spotify', href: 'https://open.spotify.com/artist/5bOjTZCohwu1EQ7BHcq2sK' },
    { label: 'Apple Music', href: 'https://music.apple.com/mx/artist/martini/1756805973' },
    { label: 'YouTube', href: '#' },
    { label: 'SoundCloud', href: '#' },
    { label: 'BeatStars', href: '#' },
  ],
} as const
