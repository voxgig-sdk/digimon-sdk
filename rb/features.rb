# Digimon SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DigimonFeatures
  def self.make_feature(name)
    case name
    when "base"
      DigimonBaseFeature.new
    when "ratelimit"
      DigimonRatelimitFeature.new
    when "retry"
      DigimonRetryFeature.new
    when "test"
      DigimonTestFeature.new
    when "timeout"
      DigimonTimeoutFeature.new
    else
      DigimonBaseFeature.new
    end
  end
end
