module Api
  class ReleasesController < ApplicationController
    def index
      releases = Release.includes(:tracks)

      render json: releases.as_json(
        only: %i[id title kind year era description cover_from cover_to],
        include: { tracks: { only: %i[id title duration audio_url bpm root_note] } }
      )
    end
  end
end
