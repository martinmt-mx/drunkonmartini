// Portada con textura de scanlines. Usa la imagen real si existe; si no,
// un degradado con la inicial (para lanzamientos sin portada todavía).
export function Cover({ title, artworkUrl, from, to, big = false }: {
  title: string
  artworkUrl: string | null
  from?: string | null
  to?: string | null
  big?: boolean
}) {
  return (
    <span
      className={`cover ${big ? 'big' : ''}`}
      style={artworkUrl ? undefined : { background: `radial-gradient(circle at 30% 25%, ${from ?? '#ff2a3d'}, ${to ?? '#0b0c10'} 70%)` }}
      aria-hidden
    >
      {artworkUrl ? (
        <img src={artworkUrl} alt="" loading="lazy" />
      ) : (
        <span className="cover-mark pixel">{title[0]}</span>
      )}
    </span>
  )
}

/** Botones "Spotify ↗ / Apple Music ↗"; omite los que no existan. */
export function StreamLinks({ spotify, apple }: { spotify: string | null; apple: string | null }) {
  if (!spotify && !apple) return null
  return (
    <span className="stream-links">
      {spotify && <a href={spotify} target="_blank" rel="noreferrer">Spotify ↗</a>}
      {apple && <a href={apple} target="_blank" rel="noreferrer">Apple Music ↗</a>}
    </span>
  )
}
