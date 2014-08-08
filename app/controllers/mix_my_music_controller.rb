class MixMyMusicController < ApplicationController
  
  def home
    if signed_in?
      @micropost  = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])
   s3 = AWS::S3.new
    @bucket = s3.buckets['mixmymusic']
    @s3_direct_post = @bucket.presigned_post(key: "tracks/#{SecureRandom.uuid}/${filename}", success_action_status: 201, acl: :private, content_type: 'audio/mp3')
    end
  end

  def help
  end

  def about
  end

  def contact
  end
end