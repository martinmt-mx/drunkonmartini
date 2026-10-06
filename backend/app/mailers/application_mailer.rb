class ApplicationMailer < ActionMailer::Base
  # Sin dominio propio, Resend sólo permite enviar desde su dirección de pruebas.
  default from: -> { ENV.fetch("MAIL_FROM", "drunkonmartini <onboarding@resend.dev>") }
  layout "mailer"
end
