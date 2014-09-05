class Track < ActiveRecord::Base
	belongs_to :user
	has_many :parts
	has_many :parts
	has_many :songs, through: :parts
	has_many :microposts

	accepts_nested_attributes_for :songs, :parts

	def track_parts(id)
		Part.joins(:roles).where("track.id = ?", id)
	end

end
