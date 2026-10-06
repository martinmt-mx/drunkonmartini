module Api
  class MessagesController < ApplicationController
    # Anti-spam 1: máximo 5 mensajes cada 10 minutos por IP. La memoria del proceso basta
    # porque el sitio corre en un solo servidor.
    RATE_LIMIT_STORE = ActiveSupport::Cache::MemoryStore.new

    rate_limit to: 5, within: 10.minutes, only: :create, store: RATE_LIMIT_STORE,
               with: -> { render json: { ok: false, errors: [ "Demasiados mensajes. Intenta en unos minutos." ] }, status: :too_many_requests }

    def create
      # Anti-spam 2: campo trampa invisible ("honeypot"). Una persona nunca lo ve ni lo llena;
      # los bots llenan todo. Si viene lleno, fingimos éxito y no guardamos nada.
      return render(json: { ok: true }, status: :created) if params.dig(:message, :website).present?

      message = Message.new(message_params)

      if message.save
        MessageMailer.new_message(message).deliver_later
        render json: { ok: true }, status: :created
      else
        # .messages (sin el nombre del campo): los textos del modelo ya son frases completas.
        render json: { ok: false, errors: message.errors.map(&:message).uniq }, status: :unprocessable_content
      end
    end

    private

    def message_params
      params.expect(message: %i[name email body kind])
    end
  end
end
