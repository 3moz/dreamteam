class CreateFixCoaches < ActiveRecord::Migration
  def change
    create_table :fix_coaches do |t|
      change_column :coaches, :season_loss, :integer
      change_column :coaches, :playoff_loss, :integer

      t.timestamps null: false
    end
  end
end
