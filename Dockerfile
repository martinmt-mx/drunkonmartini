# syntax=docker/dockerfile:1
# Imagen de producción de drunkonmartini: un solo servidor (Rails) que sirve la API
# y la página de React ya compilada.
#
# Etapas:
#   1. frontend: compila React con Vite → frontend/dist
#   2. gems:     instala las gemas de Rails (necesita compiladores)
#   3. final:    Ruby ligero + gemas + backend + dist en public/, con la base de datos
#                ya llena (beats, tu música de Apple Music y créditos).

# ── 1. Frontend ───────────────────────────────────────────────
FROM node:24-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ── 2. Gemas ──────────────────────────────────────────────────
FROM ruby:4.0.7-slim AS gems
ENV BUNDLE_DEPLOYMENT=1 BUNDLE_WITHOUT="development:test" BUNDLE_PATH=/usr/local/bundle
RUN apt-get update -qq \
 && apt-get install -y --no-install-recommends build-essential libyaml-dev pkg-config git \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /rails
COPY backend/Gemfile backend/Gemfile.lock backend/.ruby-version ./
RUN bundle install && rm -rf "${BUNDLE_PATH}"/ruby/*/cache

# ── 3. Final ──────────────────────────────────────────────────
FROM ruby:4.0.7-slim
ENV RAILS_ENV=production BUNDLE_DEPLOYMENT=1 BUNDLE_WITHOUT="development:test" \
    BUNDLE_PATH=/usr/local/bundle RAILS_LOG_TO_STDOUT=1
RUN apt-get update -qq \
 && apt-get install -y --no-install-recommends libyaml-0-2 sqlite3 ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /rails
COPY --from=gems /usr/local/bundle /usr/local/bundle
COPY backend/ ./
COPY --from=frontend /app/frontend/dist/ ./public/

# La base de datos se llena aquí, al construir: así el servidor arranca rápido aunque
# Render lo haya dormido. Cada deploy vuelve a bajar portadas y previews de Apple.
# (db:prepare crea la base y corre los seeds porque es nueva).
RUN SECRET_KEY_BASE_DUMMY=1 bin/rails db:prepare music:sync

# No correr como root.
RUN useradd --create-home --shell /bin/bash rails \
 && chown -R rails:rails storage log tmp
USER rails

EXPOSE 3000
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
