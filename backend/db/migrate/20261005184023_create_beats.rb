class CreateBeats < ActiveRecord::Migration[8.1]
  def change
    create_table :beats do |t|
      t.string :title
      t.integer :bpm
      t.string :musical_key
      t.string :moods
      t.string :audio_url
      t.integer :price_lease
      t.integer :price_exclusive
      t.integer :root_note
      t.boolean :available
      t.integer :position

      t.timestamps
    end
  end
end
