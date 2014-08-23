class Song < ActiveRecord::Base
	has_many :parts
	has_many :tracks, through: :parts

	accepts_nested_attributes_for :tracks, :parts
	has_many :users, through: :parts
	has_many :microposts
	
end
