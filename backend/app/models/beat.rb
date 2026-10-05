class Beat < ApplicationRecord
  validates :title, :bpm, presence: true

  scope :available, -> { where(available: true) }
  default_scope { order(:position) }

  # Moods se guardan como texto separado por comas ("dark,rnb,slow").
  def mood_list
    moods.to_s.split(",").map(&:strip).reject(&:empty?)
  end
end
