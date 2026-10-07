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

    if redirect?(request)
      location = "https://#{@host}#{request.fullpath}" # el #seccion lo conserva el navegador
      [ 301, { "location" => location, "content-type" => "text/plain" }, [ "Mudado a #{location}\n" ] ]
    else
      @app.call(env)
    end
  end

  private

  def redirect?(request)
    @host.present? &&
      request.host.end_with?(".onrender.com") && # sólo el subdominio de Render (no localhost)
      request.path != "/up" # el health check de Render tiene que responder 200
  end
end

canonical = ENV.fetch("CANONICAL_HOST") { Rails.env.production? ? "drunkonmartini.com" : nil }
Rails.application.config.middleware.insert_before 0, CanonicalHost, canonical
