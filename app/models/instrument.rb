class Instrument < ActiveRecord::Base
	belongs_to :user
	has_many :tracks

	validates :name, presence: true
	validates :user_id, presence: true

end
