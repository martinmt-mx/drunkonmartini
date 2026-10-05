module Api
  class BeatsController < ApplicationController
    def index
      beats = Beat.available

      render json: beats.map { |beat|
        beat.as_json(only: %i[id title bpm musical_key audio_url price_lease price_exclusive root_note])
            .merge("moods" => beat.mood_list)
      }
    end
  end
end
