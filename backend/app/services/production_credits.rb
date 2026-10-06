require "net/http"
require "json"

# Llena la tabla credits con la lista manual de config/streaming.yml.
# Por cada canción: si tiene id de Apple, de ahí salen título, artistas, fecha,
# portada y preview; si no, el oEmbed oficial de Spotify da título y portada.
class ProductionCredits
  APPLE_LOOKUP = "https://itunes.apple.com/lookup".freeze
  SPOTIFY_OEMBED = "https://open.spotify.com/oembed".freeze

  def self.sync!
    new(Rails.application.config_for(:streaming)).sync!
  end

  def initialize(config)
    @config = config
    @entries = Array(config[:production_credits])
  end

  # Devuelve cuántos créditos quedaron.
  def sync!
    apple = apple_tracks

    Credit.transaction do
      @entries.each { |entry| upsert(entry, apple[entry[:apple]]) }
      # Si quitaste una canción del YAML, también se quita del sitio.
      Credit.where.not(spotify_track_id: @entries.map { |e| e[:spotify] }).delete_all
      reorder_newest_first
    end

    Credit.count
  end

  private

  def upsert(entry, apple_song)
    credit = Credit.find_or_initialize_by(spotify_track_id: entry[:spotify])
    attrs = apple_song ? from_apple(apple_song) : from_spotify(entry[:spotify])
    credit.update!(
      **attrs,
      artists: entry[:artists].presence || attrs[:artists],
      role: entry[:role].presence || "producción",
      apple_track_id: entry[:apple],
      spotify_url: "https://open.spotify.com/track/#{entry[:spotify]}"
    )
  end

  def from_apple(song)
    {
      title: song["trackName"],
      artists: song["artistName"],
      release_date: song["releaseDate"].to_date,
      artwork_url: song["artworkUrl100"].sub("100x100bb", "600x600bb"),
      preview_url: song["previewUrl"],
      apple_url: song["trackViewUrl"]
    }
  end

  def from_spotify(track_id)
    data = get_json(SPOTIFY_OEMBED, url: "https://open.spotify.com/track/#{track_id}")
    { title: data["title"], artwork_url: data["thumbnail_url"] }
  end

  # Una sola petición a Apple para todos los ids: { apple_id => canción }
  def apple_tracks
    ids = @entries.filter_map { |e| e[:apple] }
    return {} if ids.empty?

    results = get_json(APPLE_LOOKUP, id: ids.join(","), country: @config[:country])["results"]
    results.index_by { |song| song["trackId"] }
  end

  def get_json(url, params)
    uri = URI(url)
    uri.query = URI.encode_www_form(params)
    response = Net::HTTP.get_response(uri)
    raise "#{uri.host} respondió #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    JSON.parse(response.body)
  end

  # Más nuevas primero; las que no tienen fecha (sólo Spotify) al final.
  def reorder_newest_first
    Credit.unscoped.order(Arel.sql("release_date IS NULL, release_date DESC")).each_with_index do |credit, i|
      credit.update_column(:position, i)
    end
  end
end
