class AddAnotherArrayedField < ActiveRecord::Migration[4.2]

  def change
    add_column :things, :list, :text
  end

end
