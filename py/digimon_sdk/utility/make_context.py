# Digimon SDK utility: make_context

from digimon_sdk.core.context import DigimonContext


def make_context_util(ctxmap, basectx):
    return DigimonContext(ctxmap, basectx)
