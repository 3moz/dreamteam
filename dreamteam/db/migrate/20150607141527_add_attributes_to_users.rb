class AddAttributesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :user_name, :text
    add_column :users, :password_digest, :text
  end
end
