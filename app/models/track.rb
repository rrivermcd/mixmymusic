class Track < ActiveRecord::Base
	belongs_to :user
	has_many :parts, :dependent => :destroy
	has_many :songs, through: :parts
	has_many :microposts

	accepts_nested_attributes_for :songs, :parts


end
