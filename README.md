# drunkonmartini

Sitio de artista + productor. **Lado A** = canciones (R&B experimental), **Lado B** = beats y créditos de producción.
Estética: internet nocturno minimalista (ventanas de OS viejo, scanlines, un solo color neón por lado).

```
backend/   Rails 8.1 API (SQLite): releases, tracks, beats, mensajes de contacto
frontend/  React 19 + TypeScript + Vite
```

## Lo técnico

- **API REST en Rails 8.1 (modo API)**: modelos con asociaciones y validaciones, rutas con namespace, strong parameters y `includes` para evitar consultas N+1.
- **Frontend React 19 + TypeScript** desacoplado del backend; los tipos reflejan el JSON de la API.
- **Reproductor propio con Web Audio API**: reproduce archivos o sintetiza en tiempo real un demo con la tonalidad y el BPM de cada track (osciladores, filtros, envolventes) y dibuja un visualizador en `<canvas>` con `AnalyserNode`.
- **Resiliencia**: si la API no responde, el frontend cae a datos locales en vez de quedarse en blanco.
- **Manejo de concurrencia**: un id de petición evita que dos reproducciones se encimen cuando se hace clic rápido (race condition).
- **Sin librerías de UI**: CSS a mano con variables por tema, responsive hasta 375 px y respeto a `prefers-reduced-motion`.

## Correr en desarrollo (Ubuntu / WSL)

```bash
# terminal 1
cd backend && bin/rails db:prepare && bin/rails music:sync && bin/rails s -p 3000

# terminal 2
cd frontend && npm install && npm run dev
```

Abre http://localhost:5173. Vite reenvía `/api/*` a Rails.
Si Rails no está corriendo, el frontend usa `src/fallback.ts` y en la barra aparece `api·offline`.

## Dónde editar

| Qué | Archivo |
|---|---|
| Bio, redes, correo | `frontend/src/profile.ts` |
| Tus lanzamientos (Lado A) y créditos de producción (Lado B) | `backend/config/streaming.yml` → `bin/rails music:sync` |
| Beats (nombre, BPM, tonalidad, precio) | `backend/db/seeds.rb` → `bin/rails db:seed` |
| Audio de los beats | `frontend/public/audio/beats/*.mp3`: previews de 60 s; los WAV originales no se suben |
| Colores de cada lado / nueva era | `frontend/src/styles.css` (`--accent`) |

## Música real

`bin/rails music:sync` descarga desde la iTunes Search API de Apple (pública, sin llaves) los lanzamientos
del artista, sus portadas y previews de 30 s, y los créditos de producción listados en `config/streaming.yml`.
Los previews se reproducen en el reproductor propio del sitio (Apple los sirve con CORS abierto, así que pasan
por el visualizador), y cada canción enlaza a Spotify y Apple Music para escucharla completa. Correrlo dos
veces no duplica nada: los registros se buscan por sus ids de Apple y Spotify.

## Audio

Cada track y beat tiene `audio_url`. Mientras esté vacío, el reproductor genera un **demo con sintetizador**
en el navegador (acordes menores + 808, con el BPM y la tonalidad del track). Cuando pongas la URL de un MP3,
se reproduce el archivo real.

## API

- `GET  /api/releases`: releases con sus tracks
- `GET  /api/beats`: beats disponibles
- `GET  /api/credits`: canciones de otros artistas donde participé en la producción
- `POST /api/messages`: `{ message: { name, email, body, kind } }`, kind ∈ booking · beat · colab · guestbook.
  Cada mensaje se guarda y se manda por correo; máximo 5 cada 10 minutos por IP, y un campo trampa
  invisible descarta a los bots.

## Producción (Render, plan gratis)

En producción es **un solo servicio**: Rails sirve la API y también la página de React ya compilada
(en `public/`). El `Dockerfile` lo arma en tres etapas: compila React con Node, instala las gemas y
construye la imagen final con la base de datos ya llena (`db:prepare` + `music:sync`).

Como el plan gratis de Render no tiene disco permanente, la base se reconstruye en cada deploy. No se
pierde nada importante: la música y los beats vuelven a cargarse, y los mensajes del formulario llegan
por correo.

Para publicar: Render → **New → Blueprint** → elegir este repo. `render.yaml` crea el servicio y pide
`RESEND_API_KEY`, una llave de [Resend](https://resend.com) creada con la cuenta del correo que recibe
los mensajes. Sin ella, el sitio funciona pero los mensajes no se envían.

**Por qué Resend y no Gmail:** el plan gratis de Render bloquea los puertos de SMTP (25, 465, 587), así
que el correo se manda por la API HTTPS de Resend (`lib/resend_delivery.rb`, registrada como forma de
envío de Action Mailer). Sin dominio propio, Resend envía desde `onboarding@resend.dev` sólo hacia el
correo de la cuenta, que es justo lo que necesita el formulario.
