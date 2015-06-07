class CreateComparisons < ActiveRecord::Migration
  def change
    create_table :comparisons do |t|
      t.string :search

      t.timestamps null: false
    end
  end
end
