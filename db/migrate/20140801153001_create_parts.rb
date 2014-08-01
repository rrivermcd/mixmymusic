class CreateParts < ActiveRecord::Migration
  def change
    create_table :parts do |t|
      t.integer :track_id
      t.integer :song_id

      t.timestamps
    end
  end
end
