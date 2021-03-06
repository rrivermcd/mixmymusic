﻿class MicropostsController < ApplicationController
  before_action :signed_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: :destroy

  def create
    @micropost = current_user.microposts.build(micropost_params)
    @song = song_params
    @post = Micropost.new(:content => @micropost.content, :song_id => @song, :user_id => @micropost.user_id)
    if @post.save
      flash[:success] = "It's been Shouted!"
      redirect_to root_url
    else
      @feed_items = []
      render 'mix_my_music/home'
    end
  end

  def destroy
    @micropost.destroy
    redirect_to root_url
  end

  private

    def micropost_params
      params.require(:micropost).permit(:content)
    end

    def correct_user
      @micropost = current_user.microposts.find_by(id: params[:id])
      redirect_to root_url if @micropost.nil?
    end
    
    def song_params
      params[:song_id]
    end
end