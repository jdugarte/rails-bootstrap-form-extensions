class Thing < ActiveRecord::Base

  belongs_to :category

  validates :name, presence: true
  validate :new_category_presence

  serialize :urls, Array
  serialize :list, Array
  serialize :variables, Array
  serialize :schedule, BootstrapFormExtensions::Scheduler.serializer

  attr_accessor :new_category

  def save_with_category
    return false unless valid?
    transaction { add_category_if_new && save }
  end

  private

  def add_category_if_new
    return true unless category_id == 0

    category = Category.build name: new_category
    if category.save
      self.category, self.new_category = category, ''
      return true
    end

    errors.add :category_id, category.errors.full_messages
    return false
  end

  def new_category_presence
    return true unless category_id == 0

    if new_category.blank?
      errors.add :category_id, "can't be blank"
      return false
    end
  end

end
