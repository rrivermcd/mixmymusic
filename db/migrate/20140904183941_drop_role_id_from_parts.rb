class DropRoleIdFromParts < ActiveRecord::Migration
  def change
  	remove_column :parts, :role_id 
  end
end
