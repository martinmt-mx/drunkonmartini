class CreateCredits < ActiveRecord::Migration[8.1]
  def change
    create_table :credits do |t|
      t.string :title
      t.string :artists
      t.string :role
      t.date :release_date
      t.string :artwork_url
      t.string :preview_url
      t.string :apple_url
      t.string :spotify_url
      t.bigint :apple_track_id
      t.string :spotify_track_id
      t.integer :position

      t.timestamps
    end
    add_index :credits, :spotify_track_id, unique: true
  end
end
