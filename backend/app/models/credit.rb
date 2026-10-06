# Canción de otro artista donde participé en la producción.
# La lista se define en config/streaming.yml y se llena con `bin/rails music:sync`.
class Credit < ApplicationRecord
  validates :title, :spotify_track_id, presence: true
  validates :spotify_track_id, uniqueness: true

  default_scope { order(:position) }
end
