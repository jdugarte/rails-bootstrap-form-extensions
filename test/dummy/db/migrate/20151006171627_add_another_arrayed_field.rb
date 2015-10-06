class AddAnotherArrayedField < ActiveRecord::Migration

  def change
    add_column :things, :list, :text
  end

end
