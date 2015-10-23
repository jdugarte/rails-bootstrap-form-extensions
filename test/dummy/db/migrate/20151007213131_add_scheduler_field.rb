class AddSchedulerField < ActiveRecord::Migration

  def change
    add_column :things, :schedule, :text
  end

end
