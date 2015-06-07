class FixTeamLeagueColName < ActiveRecord::Migration
  def change
    rename_column :team_seasons, :league, :team_league
  end
end
