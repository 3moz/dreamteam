# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150607141527) do

  create_table "coach_careers", force: :cascade do |t|
    t.string   "coach_code"
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "season_win"
    t.integer  "season_loss"
    t.integer  "playoff_win"
    t.integer  "playoff_loss"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "coaches", force: :cascade do |t|
    t.string   "coach_code"
    t.integer  "year"
    t.integer  "yr_order"
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "season_win"
    t.integer  "season_loss"
    t.integer  "playoff_win"
    t.integer  "playoff_loss"
    t.string   "team"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "comparisons", force: :cascade do |t|
    t.string   "search"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "drafts", force: :cascade do |t|
    t.integer  "draft_year"
    t.integer  "draft_round"
    t.integer  "selection"
    t.string   "team"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "player_code"
    t.string   "drafted_from"
    t.string   "league"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "drop_player_reg_seasons", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fix_coaches", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "player_allstars", force: :cascade do |t|
    t.string   "player_code"
    t.integer  "year"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "conference"
    t.string   "player_league"
    t.integer  "gp"
    t.integer  "minutes"
    t.integer  "pts"
    t.integer  "dreb"
    t.integer  "oreb"
    t.integer  "reb"
    t.integer  "asts"
    t.integer  "stl"
    t.integer  "blk"
    t.integer  "turnover"
    t.integer  "pf"
    t.integer  "fga"
    t.integer  "fgm"
    t.integer  "fta"
    t.integer  "ftm"
    t.integer  "tpa"
    t.integer  "tpm"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "player_careers", force: :cascade do |t|
    t.string   "player_code"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "player_league"
    t.integer  "gp"
    t.integer  "minutes"
    t.integer  "pts"
    t.integer  "oreb"
    t.integer  "dreb"
    t.integer  "reb"
    t.integer  "asts"
    t.integer  "stl"
    t.integer  "blk"
    t.integer  "turnover"
    t.integer  "pf"
    t.integer  "fga"
    t.integer  "fgm"
    t.integer  "fta"
    t.integer  "ftm"
    t.integer  "tpa"
    t.integer  "tpm"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "player_playoffs", force: :cascade do |t|
    t.string   "player_code"
    t.integer  "year"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "player_team"
    t.string   "player_league"
    t.integer  "gp"
    t.integer  "minutes"
    t.integer  "pts"
    t.integer  "dreb"
    t.integer  "oreb"
    t.integer  "reb"
    t.integer  "asts"
    t.integer  "stl"
    t.integer  "blk"
    t.integer  "turnover"
    t.integer  "pf"
    t.integer  "fga"
    t.integer  "fgm"
    t.integer  "fta"
    t.integer  "ftm"
    t.integer  "tpa"
    t.integer  "tpm"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "player_playoffs_careers", force: :cascade do |t|
    t.string   "player_code"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "player_league"
    t.integer  "gp"
    t.integer  "minutes"
    t.integer  "drb"
    t.integer  "orb"
    t.integer  "reb"
    t.integer  "asts"
    t.integer  "stl"
    t.integer  "blk"
    t.integer  "turnover"
    t.integer  "pf"
    t.integer  "fga"
    t.integer  "fgm"
    t.integer  "fta"
    t.integer  "ftm"
    t.integer  "tpa"
    t.integer  "tpm"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "player_regular_seasons", force: :cascade do |t|
    t.string   "player_code"
    t.integer  "year"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "team"
    t.string   "league"
    t.integer  "gp"
    t.integer  "minutes"
    t.integer  "pts"
    t.integer  "oreb"
    t.integer  "dreb"
    t.integer  "reb"
    t.integer  "asts"
    t.integer  "blk"
    t.integer  "turnover"
    t.integer  "pf"
    t.integer  "fga"
    t.integer  "fgm"
    t.integer  "fta"
    t.integer  "ftm"
    t.integer  "tpa"
    t.integer  "tpm"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "players", force: :cascade do |t|
    t.string   "player_code"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "position"
    t.integer  "first_season"
    t.integer  "last_season"
    t.integer  "height_ft"
    t.integer  "height_in"
    t.integer  "weight"
    t.string   "school"
    t.string   "b_day"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "team_seasons", force: :cascade do |t|
    t.string   "team_code"
    t.integer  "year"
    t.string   "team_league"
    t.integer  "o_fgm"
    t.integer  "o_fga"
    t.integer  "o_ftm"
    t.integer  "o_fta"
    t.integer  "o_oreb"
    t.integer  "o_dreb"
    t.integer  "o_reb"
    t.integer  "o_asts"
    t.integer  "o_pf"
    t.integer  "o_stl"
    t.integer  "o_to"
    t.integer  "o_blk"
    t.integer  "o_3pm"
    t.integer  "o_3pa"
    t.integer  "o_pts"
    t.integer  "d_fgm"
    t.integer  "d_fga"
    t.integer  "d_ftm"
    t.integer  "d_fta"
    t.integer  "d_oreb"
    t.integer  "d_dreb"
    t.integer  "d_reb"
    t.integer  "d_asts"
    t.integer  "d_pf"
    t.integer  "d_stl"
    t.integer  "d_to"
    t.integer  "d_blk"
    t.integer  "d_3pm"
    t.integer  "d_3pa"
    t.integer  "d_pts"
    t.integer  "pace"
    t.integer  "won"
    t.integer  "lost"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string   "team_code"
    t.string   "team_location"
    t.string   "team_name"
    t.string   "team_league"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.text     "user_name"
    t.text     "password_digest"
  end

end
