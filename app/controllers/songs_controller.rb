class SongsController < ApplicationController

	def index
		@songs = Song.paginate(page: params[:page])
	end


	def show
    	@user = User.find(params[:id])	
		@songs =  @user.songs.order(created_at: :desc).paginate(page: params[:page], per_page: 10).distinct
		render 'index'
	end

	def create
	end

end