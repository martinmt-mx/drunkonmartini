class Message < ApplicationRecord
  KINDS = %w[booking beat colab guestbook].freeze

  # Mensajes en español: el controlador los manda tal cual al formulario.
  validates :name, presence: { message: "Escribe tu nombre." },
                   length: { maximum: 80, message: "El nombre es demasiado largo." }
  validates :email, presence: { message: "Escribe tu correo." },
                    format: { with: URI::MailTo::EMAIL_REGEXP, message: "Ese correo no parece válido." }
  validates :body, presence: { message: "Escribe un mensaje." },
                   length: { maximum: 2000, message: "El mensaje es demasiado largo (máx. 2000 caracteres)." }
  validates :kind, inclusion: { in: KINDS, message: "Elige un asunto." }
end
