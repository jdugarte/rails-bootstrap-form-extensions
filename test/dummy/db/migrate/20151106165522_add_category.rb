class AddCategory < ActiveRecord::Migration

  def change
    create_table :categories do |t|
      t.string :name
    end
    add_column :things, :category_id, :integer, references: 'categories'
  end

end
