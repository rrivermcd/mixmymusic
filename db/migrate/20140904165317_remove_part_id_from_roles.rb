class RemovePartIdFromRoles < ActiveRecord::Migration
  def change
  	remove_column :roles, :part_id
  end
end
