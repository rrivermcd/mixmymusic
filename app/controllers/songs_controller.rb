class SongsController < ApplicationController

	def index
		@songs = Song.paginate(page: params[:page])
	end

	def show
    	@user = User.find(params[:id])	
		@songs =  @user.songs.paginate(page: params[:page]).distinct

		render 'index'
	end
end