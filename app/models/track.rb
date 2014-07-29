class Track < ActiveRecord::Base
	belongs_to :user
	has_many :sets
	
	#has_many :instruments, through :users

	validates :name, presence: true
	
end
