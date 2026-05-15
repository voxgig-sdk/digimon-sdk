# Digimon SDK exists test

require "minitest/autorun"
require_relative "../Digimon_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DigimonSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
