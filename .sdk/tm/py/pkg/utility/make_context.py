# Digimon SDK utility: make_context

from projectname_sdk.core.context import DigimonContext


def make_context_util(ctxmap, basectx):
    return DigimonContext(ctxmap, basectx)
