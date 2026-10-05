class Release < ApplicationRecord
  KINDS = %w[album ep single].freeze

  has_many :tracks, -> { order(:position) }, dependent: :destroy

  validates :title, presence: true
  validates :kind, inclusion: { in: KINDS }

  default_scope { order(:position) }
end
