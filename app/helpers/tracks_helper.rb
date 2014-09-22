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

	def first_by_role(track, song)
		if song.tracks.length > 1
			first = false
			role_exists = false
			@alternatives = []
			track_roles = pluck_role_by_id(track.id, song.id)
			song_part = pluck_part(track.id, song.id)
			sister_parts = Part.where(song_id: song.id).where.not(track_id: track.id)
			sister_parts.each do |sister_part|
		 		sister_part_roles = sister_part.roles.pluck(:id)
		 		if !(track_roles & sister_part_roles).empty?
		 			role_exists = true
		 			if song_part.id < sister_part.id
		 				first = true
		 				@alternatives.push(Track.find_by(id: sister_part.track_id))
		 			end
		 		end	
			end
		 	if !role_exists
		 		first = true
		 	end
		 else
		 	first = true
		end
		return first
	end


	def pluck_part(track_id, song_id)
		Part.find_by(song_id: song_id, track_id: track_id)
	end

	def pluck_role(track_id, song_id)
		# part = Part.find_by(song_id: song_id, track_id: track_id)
		part = pluck_part(track_id, song_id)
		roles = part.roles.pluck(:role)
		# roles.join (',')
	end

	def pluck_role_by_id(track_id, song_id)
		part = pluck_part(track_id, song_id)
		roles = part.roles.pluck(:id)
	end

	def pluck_role_as_string(track_id, song_id)
		roles = pluck_role(track_id, song_id)
		roles.join(',')
	end

	def is_audio(track_url)
		File.extname(track_url) != '.pdf'
	end
end



