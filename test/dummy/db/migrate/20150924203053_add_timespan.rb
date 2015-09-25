class AddTimespan < ActiveRecord::Migration

  def change
    add_column :things, :duration_in_seconds, :integer
  end

end
