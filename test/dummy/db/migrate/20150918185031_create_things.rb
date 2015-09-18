class CreateThings < ActiveRecord::Migration

  def change
    create_table :things do |t|
      t.string :name
    end
  end

end
