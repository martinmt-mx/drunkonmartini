import type { Beat, Credit, MessageKind, Release } from './types'
import { fallbackBeats, fallbackCredits, fallbackReleases } from './fallback'

// Si Rails no está corriendo, se usan los datos locales para que la página
// nunca se quede vacía mientras diseñas.
async function getJson<T>(path: string, fallback: T): Promise<{ data: T; live: boolean }> {
  try {
    const res = await fetch(path, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(String(res.status))
    return { data: (await res.json()) as T, live: true }
  } catch {
    return { data: fallback, live: false }
  }
}

export const fetchReleases = () => getJson<Release[]>('/api/releases', fallbackReleases)
export const fetchBeats = () => getJson<Beat[]>('/api/beats', fallbackBeats)
export const fetchCredits = () => getJson<Credit[]>('/api/credits', fallbackCredits)

export async function sendMessage(message: {
  name: string
  email: string
  body: string
  kind: MessageKind
  /** Campo trampa: vacío para personas, los bots lo llenan. */
  website: string
}): Promise<{ ok: boolean; errors?: string[] }> {
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ message }),
    })
    return await res.json()
  } catch {
    return { ok: false, errors: ['El servidor no responde. Intenta más tarde.'] }
  }
}
