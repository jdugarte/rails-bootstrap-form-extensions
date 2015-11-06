class Category < ActiveRecord::Base

  has_many :things

  validates :name, presence: true

end
