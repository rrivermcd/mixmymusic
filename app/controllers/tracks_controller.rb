class TracksController < ApplicationController
	
	def index
	end
	
	def new
	end
		
	def create
		@track = current_user.tracks.build(track_params)
		@track.name = sanitize_filename(@track.track_url)
		@song_id = song_params
		@role_id = role_params
		Track.transaction do
			@track.save
	      	if @song_id.blank?
				@song = Song.create(:name => @track.name)
				@song_id = @song.id	 
  			end      		
      			@part = @track.parts.create(:song_id => @song_id, :user_id => current_user.id)
      			@role_id[:id].each do |role|
      				if !role.blank?
   						@part.aspects.create(:role_id => role)
   					end
   				end
		end
      	flash[:success] = "Saved"
		# render 'shared/track_upload_form'
      	redirect_to(root_url)	
  	end


	private

	def track_params
		params.require(:track).permit(:track_url, :id)

	end

	def song_params
		params[:song_id]
	end

	def role_params
		params[:role]
	end

	def sanitize_filename(file_name)
      just_filename = File.basename(file_name, '.*')
      # just_filename.sub(/[^\w\.\-]/,'_')
    end
end