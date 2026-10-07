// Datos fijos del perfil. Edita aquí tu bio, redes y correo.

export const profile = {
  name: 'drunkonmartini',
  handle: '@drunkonmartini',
  email: 'booking@drunkonmartini.com', // Cloudflare Email Routing lo reenvía al Gmail
  sides: {
    a: {
      label: 'Lado A',
      role: 'Artista',
      tagline: 'escribo, canto y produzco lo que siento',
      bio: 'Soy Martini, artista mexicano. Escribo, canto y produzco mis canciones: R&B con atmósferas experimentales, voces suaves y producción que juega con texturas y espacios. Debuté con “Rendido” (2025) y este año saqué el EP “Todo Bien?”. Mi sonido sigue cambiando, y eso es lo que más me emociona.',
    },
    b: {
      label: 'Lado B',
      role: 'Productor',
      tagline: 'de trap a cumbia: si suena, lo produzco',
      bio: 'Produzco de todo: trap, rap, R&B, pop, reggaetón, rock, cumbia y electrónica. Aquí puedes escuchar canciones en las que he trabajado y mis beats a la venta. Si te late uno, escríbeme para cotizar una licencia o una producción a la medida.',
    },
  },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/drunkonmartini' },
    { label: 'Spotify', href: 'https://open.spotify.com/artist/5bOjTZCohwu1EQ7BHcq2sK' },
    { label: 'Apple Music', href: 'https://music.apple.com/mx/artist/martini/1756805973' },
    { label: 'YouTube', href: 'https://www.youtube.com/@drunkonmartini' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@drunkonmartini' },
  ],
} as const
