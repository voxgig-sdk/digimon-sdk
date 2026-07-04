# Typed models for the Digimon SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Attribute(TypedDict, total=False):
    attribute: str
    description: str
    href: str
    id: int


class AttributeLoadMatch(TypedDict):
    id: str


class AttributeListMatch(TypedDict, total=False):
    attribute: str
    description: str
    href: str
    id: int


class Digimon(TypedDict, total=False):
    attribute: list
    description: list
    field: list
    href: str
    id: int
    image: list
    level: list
    name: str
    next_evolution: list
    prior_evolution: list
    release_date: str
    skill: list
    type: list
    x_antibody: bool


class DigimonLoadMatch(TypedDict):
    id: str


class DigimonListMatch(TypedDict, total=False):
    attribute: list
    description: list
    field: list
    href: str
    id: int
    image: list
    level: list
    name: str
    next_evolution: list
    prior_evolution: list
    release_date: str
    skill: list
    type: list
    x_antibody: bool


class Field(TypedDict, total=False):
    description: str
    field: str
    href: str
    id: int
    image: str


class FieldLoadMatch(TypedDict):
    id: str


class FieldListMatch(TypedDict, total=False):
    description: str
    field: str
    href: str
    id: int
    image: str


class Level(TypedDict, total=False):
    href: str
    id: int
    level: str


class LevelLoadMatch(TypedDict):
    id: str


class LevelListMatch(TypedDict, total=False):
    href: str
    id: int
    level: str


class Skill(TypedDict, total=False):
    description: str
    href: str
    id: int
    skill: str
    translation: str


class SkillLoadMatch(TypedDict):
    id: str


class SkillListMatch(TypedDict, total=False):
    description: str
    href: str
    id: int
    skill: str
    translation: str


class Type(TypedDict, total=False):
    href: str
    id: int
    type: str


class TypeLoadMatch(TypedDict):
    id: str


class TypeListMatch(TypedDict, total=False):
    href: str
    id: int
    type: str
