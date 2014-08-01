class Part < ActiveRecord::Base
	belongs_to :song
	belongs_to :track
end
