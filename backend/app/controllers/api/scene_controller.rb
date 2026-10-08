module Api
  class SceneController < ApplicationController
    def index
      render json: SceneArtist.all.map { |artist|
        artist.as_json(only: %i[id name genre links track_title release_date artwork_url preview_url apple_url apple_artist_url spotify_url])
              .merge("instagram_url" => artist.instagram_url)
      }
    end
  end
end
