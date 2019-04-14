class AddSchedulerField < ActiveRecord::Migration[4.2]

  def change
    add_column :things, :schedule, :text
  end

end
