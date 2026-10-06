require "net/http"
require "json"

# Sincroniza los lanzamientos del artista desde la iTunes Search API de Apple
# (pública, sin llaves). Crea o actualiza Release y Track; nunca duplica porque
# busca por los ids de Apple.
class AppleMusicCatalog
  LOOKUP_URL = "https://itunes.apple.com/lookup".freeze

  def self.sync!
    new(Rails.application.config_for(:streaming)).sync!
  end

  def initialize(config)
    @config = config
  end

  # Devuelve cuántos releases y tracks quedaron sincronizados.
  def sync!
    songs = fetch_songs
    by_release = songs.group_by { |song| song["collectionId"] }

    Release.transaction do
      by_release.each do |collection_id, release_songs|
        release = upsert_release(collection_id, release_songs.first)
        release_songs.sort_by { |s| s["trackNumber"] }.each { |song| upsert_track(release, song) }
      end
      reorder_newest_first
    end

    { releases: by_release.size, tracks: songs.size }
  end

  private

  def fetch_songs
    uri = URI(LOOKUP_URL)
    uri.query = URI.encode_www_form(id: @config[:apple_artist_id], entity: "song", limit: 200, country: @config[:country])
    response = Net::HTTP.get_response(uri)
    raise "Apple respondió #{response.code}" unless response.is_a?(Net::HTTPSuccess)

    since = @config[:since]
    JSON.parse(response.body)["results"].select do |r|
      r["wrapperType"] == "track" && (since.nil? || r["releaseDate"].to_date >= since)
    end
  end

  def upsert_release(collection_id, song)
    release = Release.find_or_initialize_by(apple_collection_id: collection_id)
    title, kind = split_collection_name(song["collectionName"])
    release.update!(
      title:,
      kind: release.kind.presence || kind,
      year: song["releaseDate"].to_date.year,
      release_date: song["releaseDate"].to_date,
      artwork_url: song["artworkUrl100"].sub("100x100bb", "600x600bb"),
      apple_url: song["collectionViewUrl"].sub(/\?.*\z/, ""), # sin ?i=<track>, para abrir el disco completo
      spotify_url: release.spotify_url.presence || @config[:spotify_artist_url]
    )
    release
  end

  def upsert_track(release, song)
    track = Track.find_or_initialize_by(apple_track_id: song["trackId"])
    spotify_id = @config.dig(:spotify_tracks, song["trackName"].to_sym)
    track.update!(
      release:,
      title: song["trackName"],
      position: song["trackNumber"],
      duration: format_duration(song["trackTimeMillis"]),
      preview_url: song["previewUrl"],
      apple_url: song["trackViewUrl"],
      spotify_url: spotify_id && "https://open.spotify.com/track/#{spotify_id}"
    )
  end

  # "Todo Bien? - EP" → ["Todo Bien?", "ep"]
  def split_collection_name(name)
    case name
    when /\A(.+) - EP\z/ then [ $1, "ep" ]
    when /\A(.+) - Single\z/ then [ $1, "single" ]
    else [ name, "album" ]
    end
  end

  def format_duration(ms)
    seconds = ms.to_i / 1000
    format("%d:%02d", seconds / 60, seconds % 60)
  end

  def reorder_newest_first
    Release.unscoped.where.not(release_date: nil).order(release_date: :desc).each_with_index do |release, i|
      release.update_column(:position, i)
    end
  end
end
