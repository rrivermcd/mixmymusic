class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.integer :part_id
      t.string :role

      t.timestamps
    end
  end
end
