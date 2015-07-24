#coding: UTF-8

# require 'CSV'
# require 'open-uri'


namespace :import_players_csv do
  desc "import players from csv file into db"
  task :create_players => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/players.csv', :headers => true) do |row|
      Player.create({
        player_code: row[0],
        first_name: row[1],
        last_name: row[2],
        position: row[3],
        first_season: row[4],
        last_season: row[5],
        height_ft: row[6],
        height_in: row[7],
        weight: row[8],
        school: row[9],
        b_day:row[10]
      })
    end
  end
end

namespace :import_teams_csv do
  desc "import teams from csv file into db"
  task :create_teams => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/teams.csv', :headers => true) do |row|
      Team.create({
        team_code: row[0],
        team_location: row[1],
        team_name: row[2],
        team_league: row[3]
        })
    end
  end
end

namespace :import_team_seasons_csv do
  
  task :create_team_seasons => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/team_season.csv') do |row|
      TeamSeason.create({
        team_code: row[0],
        year: row[1],
        team_league: row[2],
        o_fgm: row[3],
        o_fga: row[4],
        o_ftm: row[5],
        o_fta: row[6],
        o_oreb: row[7],
        o_dreb: row[8],
        o_reb: row[9],
        o_asts: row[10],
        o_pf: row[11],
        o_stl: row[12],
        o_to: row[13],
        o_blk: row[14],
        o_3pm: row[15],
        o_3pa: row[16],
        o_pts: row[17],
        d_fgm: row[18],
        d_fga: row[19],
        d_ftm: row[20],
        d_fta: row[21],
        d_oreb: row[22],
        d_dreb: row[23],
        d_reb: row[24],
        d_asts: row[25],
        d_pf: row[26],
        d_stl: row[27],
        d_to: row[28],
        d_blk: row[29],
        d_3pm: row[30],
        d_3pa: row[31],
        d_pts: row[32],
        pace: row[33],
        won: row[34],
        lost: row[35]
      })
    end
  end
end

namespace :import_player_regular_seasons_csv do
  
  task :create_player_regular_seasons => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/player_regular_season.csv') do |row|
    PlayerRegularSeason.create({  
      player_code: row[0],
      year: row[1],
      first_name: row[2],
      last_name: row[3],
      team: row[4],
      league: row[5],
      gp: row[6],
      minutes: row[7],
      pts: row[8],
      oreb: row[9],
      dreb: row[10],
      reb: row[11],
      asts: row[12],
      blk: row[13],
      turnover: row[14],
      pf: row[15],
      fga: row[16],
      fgm: row[17],
      fta: row[18],
      tpa: row[19],
      tpm: row[20]
      })
    end
  end
end

namespace :import_player_playoffs_careers_csv do
  
  task :create_player_playoffs_careers => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/player_playoffs_career.csv') do |row|
    PlayerPlayoffsCareer.create({  
        player_code: row[0],
        first_name: row[1],
        last_name: row[2],
        player_league: row[3],
        gp: row[4],
        minutes: row[5],
        drb: row[6],
        orb: row[7],
        reb: row[8],
        asts: row[9],
        stl: row[10],
        blk: row[11],
        turnover: row[12],
        pf: row[13],
        fga: row[14],
        fgm: row[15],
        fta: row[16],
        ftm: row[17],
        tpa: row[18],
        tpm: row[19] 
      })
    end
  end
end

namespace :import_player_playoffs_csv do
  
  task :create_player_playoffs => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/player_playoffs.csv') do |row|
    PlayerPlayoff.create({  
        player_code: row[0],
        year: row[1],
        first_name: row[2],
        last_name: row[3],
        player_team: row[4],
        player_league: row[5],
        gp: row[6],
        minutes: row[7],
        pts: row[8],
        dreb: row[9],
        oreb: row[10],
        reb: row[11],
        asts: row[12],
        stl: row[13],
        blk: row[14],
        turnover: row[15],
        pf: row[16],
        fga: row[17],
        fgm: row[18],
        fta: row[19],
        ftm: row[20],
        tpa: row[21],
        tpm: row[22] 
      })
    end
  end
end

namespace :import_player_careers_csv do
  
  task :create_player_careers => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/player_career.csv') do |row|
    PlayerCareer.create({  
        player_code: row[0],
        first_name: row[1],
        last_name: row[2],
        player_league: row[3],
        gp: row[4],
        minutes: row[5],
        pts: row[6],
        dreb: row[7],
        oreb: row[8],
        reb: row[9],
        asts: row[10],
        stl: row[11],
        blk: row[12],
        turnover: row[13],
        pf: row[14],
        fga: row[15],
        fgm: row[16],
        fta: row[17],
        ftm: row[18],
        tpa: row[19],
        tpm: row[20] 
      })
    end
  end
end

namespace :import_player_allstars_csv do
  
  task :create_player_allstars => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/player_allstar.csv') do |row|
    PlayerAllstar.create({  
        player_code: row[0],
        year: row[1],
        first_name: row[2],
        last_name: row[3],
        conference: row[4],
        player_league: row[5],
        gp: row[6],
        minutes: row[6],
        pts: row[7],
        dreb: row[8],
        oreb: row[9],
        reb: row[10],
        asts: row[11],
        stl: row[12],
        blk: row[13],
        turnover: row[14],
        pf: row[15],
        fga: row[17],
        fgm: row[18],
        fta: row[19],
        ftm: row[20],
        tpa: row[21],
        tpm: row[22] 
      })
    end
  end
end

namespace :import_drafts_csv do
  
  task :create_drafts => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/draft.csv') do |row|
    Draft.create({  
       draft_year: row[0],
       draft_round: row[1],
       selection: row[2],
       team: row[3],
       first_name: row[4],
       last_name: row[5],
       player_code: row[6],
       drafted_from: row[7],
       league: row[8]
      })
    end
  end
end

namespace :import_coaches_csv do
  
  task :create_coaches => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/coaches_data.csv') do |row|
    Coach.create({  
       coach_code: row[0],
       year: row[1],
       yr_order: row[2],
       first_name: row[3],
       last_name: row[4],
       season_win: row[5],
       season_loss: row[6],
       playoff_win: row[7],
       playoff_loss: row[8],
       team: row[9]
      })
    end
  end
end

namespace :import_coach_careers_csv do
  
  task :create_coach_careers => [:environment] do

    CSV.foreach('databasebasketball_2009_v1/coaches_career.csv') do |row|
    CoachCareer.create({  
       coach_code: row[0],
       first_name: row[1],
       last_name: row[2],
       season_win: row[3],
       season_loss: row[4],
       playoff_win: row[5],
       playoff_loss: row[6],
    })
    end
  end
end
# create other tasks for the other NBA DBs ....

# namespace :import_players_csv do
#   desc "import players from csv file"
#   task :create_players => [:environment] do
#     csv_text = File.read('databasebasketball_2009_v1/players.csv')
#     csv = CSV.parse(csv_text, :headers => true)
#     csv.each do |row|
#       Player.create! row.to_hash
#     end
#   end
# end 

# namespace :import_players_csv do

#   desc "import players from csv file"
#   task :create_players => [:environment] do
    
#     # url = 'databasebasketball_2009_v1/players.csv'
#     # url_data = open(url).read()

#     #url_data at this point = the actual player data

#     #file = File.read('databasebasketball_2009_v1/players.csv')

#     CSV.foreach('databasebasketball_2009_v1/players.csv', :headers => true) do |row|
#       Player.create! row.to_hash
#     end
  
#   end
# end

# namespace :import_players_csv do
#   desc "import players from csv file"

#   task :create_players => [:environment] do

#     url = "databasebasketball_2009_v1/players.csv"
#     url_data = open(url).read()

#     CSV.parse(url_data, headers: true).each do |row|
#       Player.create! row.to_hash
#     end

#   end    
# end

# namespace :import_players_csv do
#   desc "Imports a CSV file into an ActiveRecord table"
#   task :csv_model_import, :filename, :model, :needs => :environment do |task,args|
#     lines = File.new(args[:filename]).readlines
#     header = lines.shift.strip
#     keys = header.split(',')
#     lines.each do |line|
#       values = line.strip.split(',')
#       attributes = Hash[keys.zip values]
#       Module.const_get(args[:model]).create(attributes)
#     end
#   end
# end













