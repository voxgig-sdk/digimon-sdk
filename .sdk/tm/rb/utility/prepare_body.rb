# Digimon SDK utility: prepare_body
require_relative 'media'
module DigimonUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return DigimonUtilities.raw_body(ctx.reqdata) if DigimonUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
