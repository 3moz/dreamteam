class CreateDropPlayerRegSeasons < ActiveRecord::Migration
  def change
    create_table :drop_player_reg_seasons do |t|

      t.timestamps null: false
    end
  end
end
