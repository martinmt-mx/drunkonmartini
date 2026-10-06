module Api
  class CreditsController < ApplicationController
    def index
      render json: Credit.all.as_json(
        only: %i[id title artists role release_date artwork_url preview_url apple_url spotify_url]
      )
    end
  end
end
