# Digimon SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module DigimonFeatures
  def self.make_feature(name)
    case name
    when "base"
      DigimonBaseFeature.new
    when "test"
      DigimonTestFeature.new
    else
      DigimonBaseFeature.new
    end
  end
end
