class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :team_code
      t.string :team_location
      t.string :team_name
      t.string :team_league

      t.timestamps null: false
    end
  end
end
