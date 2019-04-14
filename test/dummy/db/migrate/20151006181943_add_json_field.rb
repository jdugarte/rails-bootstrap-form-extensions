class AddJsonField < ActiveRecord::Migration[4.2]

  def change
    add_column :things, :variables, :text
  end

end
