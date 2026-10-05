import type { ReactNode } from 'react'

// Ventana estilo sistema operativo viejo, reducida a lo mínimo.
export function Win({ title, children, className = '', aside }: {
  title: string
  children: ReactNode
  className?: string
  aside?: ReactNode
}) {
  return (
    <section className={`win ${className}`}>
      <header className="win-bar">
        <span className="win-dots" aria-hidden>
          <i /><i /><i />
        </span>
        <span className="win-title">{title}</span>
        {aside && <span className="win-aside">{aside}</span>}
      </header>
      <div className="win-body">{children}</div>
    </section>
  )
}
