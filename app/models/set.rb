class Set < ActiveRecord::Base
	has_many :tracks
	has_many :users, :through => :tracks

	validates :name, presence: true
end
