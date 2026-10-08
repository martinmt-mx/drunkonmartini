require "net/http"
require "json"
require "erb"

# Llena la tabla scene_artists con config/scene.yml. Si el artista trae el id de una
# canción de Apple Music, de ahí salen título, portada, preview y links de Apple.
# Sin link de Spotify, el botón abre la búsqueda del artista en Spotify.
class SceneSync
  APPLE_LOOKUP = "https://itunes.apple.com/lookup".freeze

  def self.sync!
    new(Rails.application.config_for(:scene)).sync!
  end

  def initialize(config)
    @artists = Array(config[:artists])
    @country = config[:country] || "mx"
  end

  # Devuelve cuántos artistas quedaron.
  def sync!
    apple = apple_tracks

    SceneArtist.transaction do
      @artists.each_with_index { |entry, i| upsert(entry, apple[entry[:apple]], i) }
      # Si quitaste a alguien del YAML, también se quita de la página.
      SceneArtist.where.not(instagram: @artists.map { |a| a[:instagram].to_s }).delete_all
    end

    SceneArtist.count
  end

  private

  def upsert(entry, song, position)
    artist = SceneArtist.find_or_initialize_by(instagram: entry[:instagram].to_s)
    artist.update!(
      name: entry[:name],
      genre: entry[:genre],
      links: (entry[:links] || {}).to_h.transform_keys(&:to_s),
      apple_track_id: entry[:apple],
      track_title: song&.dig("trackName"),
      release_date: song&.dig("releaseDate")&.to_date,
      artwork_url: song&.dig("artworkUrl100")&.sub("100x100bb", "600x600bb"),
      preview_url: song&.dig("previewUrl"),
      apple_url: song&.dig("trackViewUrl"),
      apple_artist_url: song&.dig("artistViewUrl"),
      spotify_url: entry[:spotify].presence || "https://open.spotify.com/search/#{ERB::Util.url_encode(entry[:name])}",
      position:
    )
  end

  # Una sola petición a Apple para todos: { apple_id => canción }
  def apple_tracks
    ids = @artists.filter_map { |a| a[:apple] }
    return {} if ids.empty?

    uri = URI(APPLE_LOOKUP)
    uri.query = URI.encode_www_form(id: ids.join(","), country: @country)
    response = Net::HTTP.get_response(uri)
    raise "Apple respondió #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    JSON.parse(response.body)["results"].index_by { |song| song["trackId"] }
  end
end
