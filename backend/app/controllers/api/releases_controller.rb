module Api
  class ReleasesController < ApplicationController
    def index
      releases = Release.includes(:tracks)

      render json: releases.as_json(
        only: %i[id title kind year release_date era description cover_from cover_to artwork_url apple_url spotify_url],
        include: { tracks: { only: %i[id title duration audio_url preview_url apple_url spotify_url bpm root_note] } }
      )
    end
  end
end
