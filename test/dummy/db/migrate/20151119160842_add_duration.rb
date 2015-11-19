class AddDuration < ActiveRecord::Migration

  def change
    add_column :things, :duration_in_seconds2, :float
  end

end
