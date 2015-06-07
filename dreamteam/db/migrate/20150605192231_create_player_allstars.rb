class CreatePlayerAllstars < ActiveRecord::Migration
  def change
    create_table :player_allstars do |t|
      t.string :player_code
      t.integer :year
      t.string :first_name
      t.string :last_name
      t.string :conference
      t.string :player_league
      t.integer :gp
      t.integer :minutes
      t.integer :pts
      t.integer :dreb
      t.integer :oreb
      t.integer :reb
      t.integer :asts
      t.integer :stl
      t.integer :blk
      t.integer :turnover
      t.integer :pf
      t.integer :fga
      t.integer :fgm
      t.integer :fta
      t.integer :ftm
      t.integer :tpa
      t.integer :tpm

      t.timestamps null: false
    end
  end
end
