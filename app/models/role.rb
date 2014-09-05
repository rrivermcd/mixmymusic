class Role < ActiveRecord::Base
	has_many :aspects
	has_many :parts, through: :aspects
end
