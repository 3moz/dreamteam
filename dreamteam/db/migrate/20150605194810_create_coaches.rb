class CreateCoaches < ActiveRecord::Migration
  def change
    create_table :coaches do |t|
      t.string :coach_code
      t.integer :year
      t.integer :yr_order
      t.string :first_name
      t.string :last_name
      t.integer :season_win
      t.integer :season_loss
      t.integer :playoff_win
      t.integer :playoff_loss
      t.string :team

      t.timestamps null: false
    end
  end
end
