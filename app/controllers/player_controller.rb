class player < ApplicationController

	def show
		@s3 = AWS::S3.new
		@bucket = s3.buckets[ENV['S3_BUCKET']] 
		render 'shared/player'
	end