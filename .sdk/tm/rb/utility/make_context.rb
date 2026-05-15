# Digimon SDK utility: make_context
require_relative '../core/context'
module DigimonUtilities
  MakeContext = ->(ctxmap, basectx) {
    DigimonContext.new(ctxmap, basectx)
  }
end
