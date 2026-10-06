class ApplicationMailer < ActionMailer::Base
  # Se manda desde tu Gmail (variable GMAIL_USERNAME en Render).
  default from: -> { ENV.fetch("GMAIL_USERNAME", "martinimusic.prod@gmail.com") }
  layout "mailer"
end
