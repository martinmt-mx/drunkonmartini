import { useEffect, useState, type FormEvent } from 'react'
import { sendMessage } from '../api'
import { profile } from '../profile'
import type { MessageKind } from '../types'
import { Win } from './Win'

export type ContactPrefill = { kind: MessageKind; body: string; nonce: number }

const KINDS: { value: MessageKind; label: string }[] = [
  { value: 'beat', label: 'licenciar un beat' },
  { value: 'booking', label: 'booking / shows' },
  { value: 'colab', label: 'colaboración' },
  { value: 'guestbook', label: 'sólo dejar un saludo' },
]

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent' } | { state: 'error'; errors: string[] }

export function Contact({ prefill }: { prefill: ContactPrefill | null }) {
  const [kind, setKind] = useState<MessageKind>('booking')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  useEffect(() => {
    if (!prefill) return
    setKind(prefill.kind)
    setBody(prefill.body)
    setStatus({ state: 'idle' })
  }, [prefill])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus({ state: 'sending' })
    const res = await sendMessage({ name, email, body, kind })
    if (res.ok) {
      setStatus({ state: 'sent' })
      setBody('')
    } else {
      setStatus({ state: 'error', errors: res.errors ?? ['Algo falló.'] })
    }
  }

  return (
    <section className="contact" id="contacto">
      <Win title="nuevo_mensaje.eml">
        {status.state === 'sent' ? (
          <div className="sent">
            <p className="pixel accent">✓ mensaje enviado</p>
            <p className="dim">Te contesto pronto. Normalmente de noche.</p>
            <button className="btn" onClick={() => setStatus({ state: 'idle' })}>escribir otro</button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <label>
              <span className="pixel dim">asunto</span>
              <select className="input" value={kind} onChange={(e) => setKind(e.target.value as MessageKind)}>
                {KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
              </select>
            </label>
            <div className="form-row">
              <label>
                <span className="pixel dim">nombre</span>
                <input className="input" required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                <span className="pixel dim">correo</span>
                <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <label>
              <span className="pixel dim">mensaje</span>
              <textarea className="input" required rows={5} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
            {status.state === 'error' && (
              <ul className="errors">{status.errors.map((er) => <li key={er}>{er}</li>)}</ul>
            )}
            <div className="form-foot">
              <button className="btn primary" disabled={status.state === 'sending'}>
                {status.state === 'sending' ? 'enviando…' : 'enviar ↵'}
              </button>
              <span className="dim">o directo a <a href={`mailto:${profile.email}`}>{profile.email}</a></span>
            </div>
          </form>
        )}
      </Win>
    </section>
  )
}
