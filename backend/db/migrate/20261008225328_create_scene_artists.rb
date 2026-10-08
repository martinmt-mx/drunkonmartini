class CreateSceneArtists < ActiveRecord::Migration[8.1]
  def change
    # Artistas recomendados en la sección "Escena". Los datos vienen de config/scene.yml
    # + Apple Music (bin/rails music:sync).
    create_table :scene_artists do |t|
      t.string :instagram, null: false # identificador: todos tienen Instagram
      t.string :name, null: false
      t.string :genre
      t.json :links, default: {} # otras redes: { "tiktok" => "...", "youtube" => "..." }

      # Canción destacada (sale de Apple Music si existe)
      t.bigint :apple_track_id
      t.string :track_title
      t.date :release_date
      t.string :artwork_url
      t.string :preview_url
      t.string :apple_url
      t.string :apple_artist_url
      t.string :spotify_url

      t.integer :position
      t.timestamps
    end
    add_index :scene_artists, :instagram, unique: true
  end
end
