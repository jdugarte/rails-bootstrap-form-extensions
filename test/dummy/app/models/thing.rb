class Thing < ActiveRecord::Base

  validates :name, presence: true

  serialize :urls, Array
  serialize :list, Array
  serialize :variables, Array
  serialize :schedule, BootstrapFormExtensions::Scheduler.serializer

end
