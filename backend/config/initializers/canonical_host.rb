# Redirige el subdominio viejo de Render (drunkonmartini.onrender.com) al dominio
# propio (CANONICAL_HOST, p. ej. drunkonmartini.com) con un 301 "mudado permanentemente".
#
# Así los links viejos siguen funcionando y Google ve una sola dirección oficial.
# Es un middleware (y no un before_action) porque la página de React la sirve
# Rails como archivo estático desde public/, sin pasar por ningún controlador.
class CanonicalHost
  def initialize(app, host)
    @app = app
    @host = host
  end

  def call(env)
    request = Rack::Request.new(env)
    return @app.call(env) unless old_host?(request)

    if request.path.start_with?("/api/")
      # Navegadores que guardaron la página vieja en caché la siguen mostrando sin
      # preguntar, pero sus llamadas a la API sí llegan aquí. Les respondemos normal
      # (si las redirigiéramos a otro dominio, fallarían por CORS) y les pedimos que
      # borren su caché de este sitio: la próxima visita ya se redirige.
      status, headers, body = @app.call(env)
      headers["clear-site-data"] = '"cache"'
      [ status, headers, body ]
    elsif request.path == "/up"
      @app.call(env) # el health check de Render tiene que responder 200
    else
      location = "https://#{@host}#{request.fullpath}" # el #seccion lo conserva el navegador
      [ 301, { "location" => location, "content-type" => "text/plain", "cache-control" => "no-cache" }, [ "Mudado a #{location}\n" ] ]
    end
  end

  private

  def old_host?(request)
    @host.present? && request.host.end_with?(".onrender.com") # no afecta localhost
  end
end

canonical = ENV.fetch("CANONICAL_HOST") { Rails.env.production? ? "drunkonmartini.com" : nil }
Rails.application.config.middleware.insert_before 0, CanonicalHost, canonical
