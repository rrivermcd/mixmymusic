class Player < ApplicationController

	def show
		@s3 = AWS::S3.new
		@bucket = s3.buckets['mixmymusic'] 
		render 'shared/player'
	end