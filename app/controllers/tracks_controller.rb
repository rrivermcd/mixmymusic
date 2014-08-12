class TracksController < ApplicationController
	
	def index
	end
	
	def new
	end
		
	def create
		@track = current_user.tracks.build(track_params)
		@track.name = sanitize_filename(@track.track_url)
		@song_id = params[:song_id]
		Track.transaction do
			@track.save
	      	if @song_id.blank?
				@song = Song.create(:name => @track.name)
				@song_id = @song.id	      		
  			end      		
      			@track.parts.create(:song_id => @song_id, :user_id => current_user.id)
		end
      	flash[:success] = @song_id
		# render 'shared/track_upload_form'
      	redirect_to(root_url)	
  	end


	private

	def track_params
		params.require(:track).permit(:track_url)
	end

	def sanitize_filename(file_name)
      just_filename = File.basename(file_name, '.*')
      # just_filename.sub(/[^\w\.\-]/,'_')
    end
end