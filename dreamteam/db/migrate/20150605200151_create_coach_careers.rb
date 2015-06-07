class CreateCoachCareers < ActiveRecord::Migration
  def change
    create_table :coach_careers do |t|
      t.string :coach_code
      t.string :first_name
      t.string :last_name
      t.integer :season_win
      t.integer :season_loss
      t.integer :playoff_win
      t.integer :playoff_loss

      t.timestamps null: false
    end
  end
end
