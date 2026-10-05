class CreateTracks < ActiveRecord::Migration[8.1]
  def change
    create_table :tracks do |t|
      t.references :release, null: false, foreign_key: true
      t.string :title
      t.string :duration
      t.string :audio_url
      t.integer :position
      t.integer :bpm
      t.integer :root_note

      t.timestamps
    end
  end
end
