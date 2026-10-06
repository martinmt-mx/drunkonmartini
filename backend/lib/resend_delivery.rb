require "net/http"
require "json"

# Forma de envío de Action Mailer que usa la API HTTP de Resend (https://resend.com).
#
# ¿Por qué no Gmail por SMTP? El plan gratis de Render bloquea los puertos de correo
# (25, 465 y 587). Resend se usa por HTTPS (puerto 443), que sí está permitido.
#
# Sin dominio propio, Resend sólo deja enviar desde onboarding@resend.dev hacia el
# correo con el que creaste tu cuenta de Resend, que es justo lo que necesita el
# formulario de contacto.
class ResendDelivery
  ENDPOINT = URI("https://api.resend.com/emails")

  def initialize(settings)
    @api_key = settings.fetch(:api_key)
    @from = settings.fetch(:from)
  end

  # Action Mailer llama esto con el correo ya armado (Mail::Message).
  def deliver!(mail)
    payload = {
      from: @from,
      to: mail.to,
      reply_to: mail.reply_to,
      subject: mail.subject,
      text: mail.text_part ? mail.text_part.decoded : mail.body.decoded
    }.compact

    request = Net::HTTP::Post.new(ENDPOINT, "Authorization" => "Bearer #{@api_key}", "Content-Type" => "application/json")
    request.body = payload.to_json
    response = Net::HTTP.start(ENDPOINT.host, ENDPOINT.port, use_ssl: true, open_timeout: 10, read_timeout: 15) do |http|
      http.request(request)
    end

    raise "Resend respondió #{response.code}: #{response.body}" unless response.is_a?(Net::HTTPSuccess)

    response
  end
end
