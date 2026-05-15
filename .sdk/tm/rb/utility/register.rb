# Digimon SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DigimonUtility.registrar = ->(u) {
  u.clean = DigimonUtilities::Clean
  u.done = DigimonUtilities::Done
  u.make_error = DigimonUtilities::MakeError
  u.feature_add = DigimonUtilities::FeatureAdd
  u.feature_hook = DigimonUtilities::FeatureHook
  u.feature_init = DigimonUtilities::FeatureInit
  u.fetcher = DigimonUtilities::Fetcher
  u.make_fetch_def = DigimonUtilities::MakeFetchDef
  u.make_context = DigimonUtilities::MakeContext
  u.make_options = DigimonUtilities::MakeOptions
  u.make_request = DigimonUtilities::MakeRequest
  u.make_response = DigimonUtilities::MakeResponse
  u.make_result = DigimonUtilities::MakeResult
  u.make_point = DigimonUtilities::MakePoint
  u.make_spec = DigimonUtilities::MakeSpec
  u.make_url = DigimonUtilities::MakeUrl
  u.param = DigimonUtilities::Param
  u.prepare_auth = DigimonUtilities::PrepareAuth
  u.prepare_body = DigimonUtilities::PrepareBody
  u.prepare_headers = DigimonUtilities::PrepareHeaders
  u.prepare_method = DigimonUtilities::PrepareMethod
  u.prepare_params = DigimonUtilities::PrepareParams
  u.prepare_path = DigimonUtilities::PreparePath
  u.prepare_query = DigimonUtilities::PrepareQuery
  u.result_basic = DigimonUtilities::ResultBasic
  u.result_body = DigimonUtilities::ResultBody
  u.result_headers = DigimonUtilities::ResultHeaders
  u.transform_request = DigimonUtilities::TransformRequest
  u.transform_response = DigimonUtilities::TransformResponse
}
