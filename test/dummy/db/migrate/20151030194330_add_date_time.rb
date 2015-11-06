class AddDateTime < ActiveRecord::Migration

  def change
    add_column :things, :start_at, :datetime
  end

end
