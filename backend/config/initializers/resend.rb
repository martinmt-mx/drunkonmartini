# Registra Resend como forma de envío de correos (ver lib/resend_delivery.rb).
# Se activa en producción si existe RESEND_API_KEY (config/environments/production.rb).
require Rails.root.join("lib/resend_delivery").to_s

ActiveSupport.on_load(:action_mailer) do
  add_delivery_method :resend, ResendDelivery,
    api_key: ENV.fetch("RESEND_API_KEY", ""),
    from: ENV.fetch("MAIL_FROM", "drunkonmartini <onboarding@resend.dev>")
end
