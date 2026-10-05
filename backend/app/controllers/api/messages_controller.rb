module Api
  class MessagesController < ApplicationController
    def create
      message = Message.new(message_params)

      if message.save
        render json: { ok: true }, status: :created
      else
        render json: { ok: false, errors: message.errors.full_messages }, status: :unprocessable_content
      end
    end

    private

    def message_params
      params.expect(message: %i[name email body kind])
    end
  end
end
