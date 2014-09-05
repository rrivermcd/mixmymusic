class Aspect < ActiveRecord::Base
	belongs_to :part
	belongs_to :role
end
