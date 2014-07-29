class ChangeTracksSessionidName < ActiveRecord::Migration
  def change
  	rename_column :tracks, :session_id, :set_id
  end
end
