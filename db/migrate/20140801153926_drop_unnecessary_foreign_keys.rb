class DropUnnecessaryForeignKeys < ActiveRecord::Migration
  def change
  	remove_column :tracks, :song_id
  	remove_column :songs, :track_id
  end
end
