module TracksHelper
	def set_direct_post
		get_s3
		@s3_direct_post = @bucket.presigned_post(key: "tracks/#{SecureRandom.uuid}/${filename}", success_action_status: 201, acl: :private).where(:content_type).starts_with("")
		@track = Track.new
	end
	def get_s3
		s3 = AWS::S3.new
		@bucket = s3.buckets['mixmymusic']
	end

	def pluck_role(track_id, song_id)
		part = Part.find_by(song_id: song_id, track_id: track_id)
		roles = part.roles.pluck(:role)
		roles.join (',')
	end

	def is_audio(track_url)
		File.extname(track_url) != '.pdf'
	end


end



