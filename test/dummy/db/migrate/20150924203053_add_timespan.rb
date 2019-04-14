class AddTimespan < ActiveRecord::Migration[4.2]

  def change
    add_column :things, :duration_in_seconds, :integer
  end

end
