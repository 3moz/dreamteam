class CreateTeamSeasons < ActiveRecord::Migration
  def change
    create_table :team_seasons do |t|
      t.string :team_code
      t.integer :year
      t.string :league
      t.integer :o_fgm
      t.integer :o_fga
      t.integer :o_ftm
      t.integer :o_fta
      t.integer :o_oreb
      t.integer :o_dreb
      t.integer :o_reb
      t.integer :o_asts
      t.integer :o_pf
      t.integer :o_stl
      t.integer :o_to
      t.integer :o_blk
      t.integer :o_3pm
      t.integer :o_3pa
      t.integer :o_pts
      t.integer :d_fgm
      t.integer :d_fga
      t.integer :d_ftm
      t.integer :d_fta
      t.integer :d_oreb
      t.integer :d_dreb
      t.integer :d_reb
      t.integer :d_asts
      t.integer :d_pf
      t.integer :d_stl
      t.integer :d_to
      t.integer :d_blk
      t.integer :d_3pm
      t.integer :d_3pa
      t.integer :d_pts
      t.integer :pace
      t.integer :won
      t.integer :lost

      t.timestamps null: false
    end
  end
end
