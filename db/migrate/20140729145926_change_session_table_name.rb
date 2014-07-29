class ChangeSessionTableName < ActiveRecord::Migration
  def change
  	rename_table :sessions, :sets
  end

end
