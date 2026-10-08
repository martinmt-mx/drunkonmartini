# Artista recomendado en la sección "Escena" (artistas de Colima que Martini recomienda).
# La lista vive en config/scene.yml y se llena con `bin/rails music:sync`.
class SceneArtist < ApplicationRecord
  validates :name, :instagram, presence: true
  validates :instagram, uniqueness: true

  default_scope { order(:position) }

  def instagram_url
    "https://www.instagram.com/#{instagram}/"
  end
end
