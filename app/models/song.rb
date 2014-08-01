class Song < ActiveRecord::Base
	has_many :parts
	has_many :tracks, through: :parts
end
