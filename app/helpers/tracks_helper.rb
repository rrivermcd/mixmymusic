module TracksHelper
	def set_direct_post
		get_s3
		@s3_direct_post = @bucket.presigned_post(key: "tracks/#{SecureRandom.uuid}/${filename}", success_action_status: 201, acl: :private, content_type: 'audio/mp3')
		@track = Track.new
	end
	def get_s3
		s3 = AWS::S3.new
		@bucket = s3.buckets['mixmymusic']
	end
end
