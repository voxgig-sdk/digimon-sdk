# Digimon SDK feature factory

from digimon_sdk.feature.base_feature import DigimonBaseFeature
from digimon_sdk.feature.test_feature import DigimonTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DigimonBaseFeature(),
        "test": lambda: DigimonTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
