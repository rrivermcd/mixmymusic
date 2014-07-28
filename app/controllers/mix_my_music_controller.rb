class MixMyMusicController < ApplicationController
  
  def home
    if signed_in?
      @micropost  = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])
      s3 = AWS::S3.new
      @bucket = s3.buckets[ENV['S3_BUCKET']] 
    end
  end

  def help
  end

  def about
  end

  def contact
  end
end