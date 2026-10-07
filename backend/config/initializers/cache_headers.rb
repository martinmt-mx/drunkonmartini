# Cuánto tiempo puede guardar el navegador cada archivo de public/.
#
# - /assets/* (JS y CSS de Vite): el nombre trae un hash (index-BvtDsmQ2.js) que
#   cambia con cada build, así que se pueden guardar un año sin riesgo.
# - Todo lo demás (index.html, audio, robots.txt): "no-cache" = el navegador lo guarda
#   pero pregunta antes de usarlo; si no cambió, el servidor responde 304 y no se
#   vuelve a descargar. Así cada deploy se ve en la siguiente visita.
#
# Va como middleware porque ActionDispatch::Static sólo acepta unos encabezados
# para todos los archivos (config.public_file_server.headers).
class CacheHeaders
  LONG = "public, max-age=31536000, immutable".freeze
  REVALIDATE = "no-cache".freeze

  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, body = @app.call(env)
    path = env["PATH_INFO"].to_s

    if status.to_i < 400 && !path.start_with?("/api/", "/up")
      headers["cache-control"] = path.start_with?("/assets/") ? LONG : REVALIDATE
    end

    [ status, headers, body ]
  end
end

Rails.application.config.middleware.insert_before ActionDispatch::Static, CacheHeaders
