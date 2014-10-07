class TracksController < ApplicationController
	
	def index
	end
	
	def new
	end
		
	def create
		@track = current_user.tracks.build(track_params)
		@track.name = sanitize_filename(@track.track_url)
		@song_id = song_params
		@old_song_id = @song_id
		@roles = role_params
		@branch = branch_params
		@new_song = new_song(@song_id, @roles, @branch)
		Track.transaction do
			@track.save
			if @song_id.blank? or @new_song
				@song = Song.create(:name => @track.name)
				@song_id = @song.id	 
  			end      		
  			@part = @track.parts.create(:song_id => @song_id, :user_id => current_user.id)
  			@roles[:id].each do |role|
  				if !role.blank?
						@part.aspects.create(:role_id => role)
					end
				end
			if @new_song
				@branch[:id].each do |track_id|
					if !track_id.empty?
						@old_part = Part.where(song_id: @old_song_id, track_id: track_id).first
						@new_part = Part.create(song_id: @song_id, track_id: track_id, user_id: @old_part.user_id)					
						@roles = Aspect.where(part_id: @old_part.id).pluck(:role_id)
						@roles.each do |role|
							@new_part.aspects.create(role_id: role)
						end
					end	
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

	def branch_params
		params[:branch]
	end

	def sanitize_filename(file_name)
      just_filename = File.basename(file_name, '.*')
      # just_filename.sub(/[^\w\.\-]/,'_')
    end

	def new_song(song_id, roles, branch)
	new_song = false
	parts = Part.where(song_id: song_id)
		parts.each do |part|
			role_ids = part.roles.pluck(:id).collect{|i| i.to_s}
			if (!(roles_for_new_song & role_ids).empty?) or branch[:id].length > 1 #!(roles[:id] & role_ids).empty? and 
				new_song = true
			end
		end
		return new_song
	end

	def roles_for_new_song
		["1", "2", "3"]
	end

end