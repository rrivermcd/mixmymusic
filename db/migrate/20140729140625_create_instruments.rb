class CreateInstruments < ActiveRecord::Migration
  def change
    create_table :instruments do |t|
      t.string :name
      t.integer :user_id
      t.integer :track_id

      t.timestamps
    end
  end
end
