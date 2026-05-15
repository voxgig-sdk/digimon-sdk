# Digimon SDK utility: feature_add
module DigimonUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
