class AddJsonField < ActiveRecord::Migration

  def change
    add_column :things, :variables, :text
  end

end
