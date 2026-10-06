# Avisa por correo cada vez que alguien escribe en el formulario del sitio.
# Al darle "Responder" en Gmail, la respuesta va directo a quien escribió (reply_to).
class MessageMailer < ApplicationMailer
  SUBJECTS = {
    "booking" => "Booking / shows",
    "beat" => "Licencia de beat",
    "colab" => "Colaboración",
    "guestbook" => "Saludo"
  }.freeze

  def new_message(message)
    @message = message
    mail(
      to: ENV.fetch("CONTACT_EMAIL", "martinimusic.prod@gmail.com"),
      reply_to: message.email,
      subject: "[drunkonmartini] #{SUBJECTS.fetch(message.kind, 'Mensaje')} de #{message.name}"
    )
  end
end
