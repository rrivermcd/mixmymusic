class Track < ActiveRecord::Base
	belongs_to :user
	has_many :parts
	has_many :songs, through: :parts
end
