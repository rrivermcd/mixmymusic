class Song < ActiveRecord::Base
	has_many :parts
	has_many :tracks, through: :parts
  	default_scope -> { order('created_at DESC') }
	accepts_nested_attributes_for :tracks, :parts
	has_many :users, through: :parts
	
end
