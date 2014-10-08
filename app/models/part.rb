class Part < ActiveRecord::Base
	belongs_to :song
	belongs_to :track
	belongs_to :user
	
	has_many :aspects, :dependent => :destroy
	has_many :roles, through: :aspects



end
