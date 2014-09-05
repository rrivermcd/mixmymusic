class CreateAspects < ActiveRecord::Migration
  def change
    create_table :aspects do |t|
      t.integer :part_id
      t.integer :role_id

      t.timestamps
    end
  end
end
