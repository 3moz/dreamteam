class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :player_code
      t.string :first_name
      t.string :last_name
      t.string :position
      t.integer :first_season
      t.integer :last_season
      t.integer :height_ft
      t.integer :height_in
      t.integer :weight
      t.string :school
      t.string :b_day

      t.timestamps null: false
    end
  end
end
