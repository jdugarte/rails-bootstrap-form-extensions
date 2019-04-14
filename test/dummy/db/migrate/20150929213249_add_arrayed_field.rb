class AddArrayedField < ActiveRecord::Migration[4.2]

  def change
    add_column :things, :urls, :text
  end

end
