class CreateDrafts < ActiveRecord::Migration
  def change
    create_table :drafts do |t|
      t.integer :draft_year
      t.integer :draft_round
      t.integer :selection
      t.string :team
      t.string :first_name
      t.string :last_name
      t.string :player_code
      t.string :drafted_from
      t.string :league

      t.timestamps null: false
    end
  end
end
