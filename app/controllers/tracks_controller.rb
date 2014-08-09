class TracksController < ApplicationController
	def index
	end
	def new
		s3 = AWS::S3.new
    	@bucket = s3.buckets['mixmymusic']
  		@s3_direct_post = @bucket.presigned_post(key: "tracks/#{SecureRandom.uuid}/${filename}", success_action_status: 201, acl: :private, content_type: 'audio/mp3')
		@track = Track.new
	end

	def create
		@track = current_user.tracks.build(track_params)
		@track.save
		if @track.save
			flash[:success] = "Saved"
			# render 'shared/track_upload_form'
      		redirect_to(root_url)
      	end
	end
	
	private

	def track_params
		params.require(:track).permit(:track_url, :name)
	end
end