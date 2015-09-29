class Thing < ActiveRecord::Base

  validates :name, presence: true

  serialize :urls, Array

end
