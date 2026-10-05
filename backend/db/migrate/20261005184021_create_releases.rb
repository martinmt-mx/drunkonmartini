class CreateReleases < ActiveRecord::Migration[8.1]
  def change
    create_table :releases do |t|
      t.string :title
      t.string :kind
      t.integer :year
      t.string :era
      t.text :description
      t.string :cover_from
      t.string :cover_to
      t.integer :position

      t.timestamps
    end
  end
end
