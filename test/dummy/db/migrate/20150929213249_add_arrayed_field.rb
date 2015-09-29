class AddArrayedField < ActiveRecord::Migration

  def change
    add_column :things, :urls, :text
  end

end
