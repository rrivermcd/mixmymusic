class AddSongAndTrackIdToMicroposts < ActiveRecord::Migration
  def change
    add_column :microposts, :song_id, :integer
    add_column :microposts, :track_id, :integer
  end
end
