class ChangePlayerPlayoffsCareers < ActiveRecord::Migration
  def change
    rename_column :player_playoffs_careers, :ore, :orb
  end
end
