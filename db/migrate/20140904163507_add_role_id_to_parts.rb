class AddRoleIdToParts < ActiveRecord::Migration
  def change
    add_column :parts, :role_id, :integer
  end
end
