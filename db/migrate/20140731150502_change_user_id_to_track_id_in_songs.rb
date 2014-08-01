class ChangeUserIdToTrackIdInSongs < ActiveRecord::Migration
  def change
  	rename_column :songs, :user_id, :track_id 
  end
end
