class AddStreamingToReleasesAndTracks < ActiveRecord::Migration[8.1]
  def change
    change_table :releases do |t|
      t.bigint :apple_collection_id, index: { unique: true }
      t.date :release_date
      t.string :artwork_url
      t.string :apple_url
      t.string :spotify_url
    end

    change_table :tracks do |t|
      t.bigint :apple_track_id, index: { unique: true }
      t.string :preview_url
      t.string :apple_url
      t.string :spotify_url
    end
  end
end
