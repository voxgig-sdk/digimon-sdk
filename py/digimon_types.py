# Typed models for the Digimon SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Attribute:
    attribute: Optional[str] = None
    description: Optional[str] = None
    href: Optional[str] = None
    id: Optional[int] = None


@dataclass
class AttributeLoadMatch:
    id: str


@dataclass
class AttributeListMatch:
    attribute: Optional[str] = None
    description: Optional[str] = None
    href: Optional[str] = None
    id: Optional[int] = None


@dataclass
class Digimon:
    attribute: Optional[list] = None
    description: Optional[list] = None
    field: Optional[list] = None
    href: Optional[str] = None
    id: Optional[int] = None
    image: Optional[list] = None
    level: Optional[list] = None
    name: Optional[str] = None
    next_evolution: Optional[list] = None
    prior_evolution: Optional[list] = None
    release_date: Optional[str] = None
    skill: Optional[list] = None
    type: Optional[list] = None
    x_antibody: Optional[bool] = None


@dataclass
class DigimonLoadMatch:
    id: str


@dataclass
class DigimonListMatch:
    attribute: Optional[list] = None
    description: Optional[list] = None
    field: Optional[list] = None
    href: Optional[str] = None
    id: Optional[int] = None
    image: Optional[list] = None
    level: Optional[list] = None
    name: Optional[str] = None
    next_evolution: Optional[list] = None
    prior_evolution: Optional[list] = None
    release_date: Optional[str] = None
    skill: Optional[list] = None
    type: Optional[list] = None
    x_antibody: Optional[bool] = None


@dataclass
class Field:
    description: Optional[str] = None
    field: Optional[str] = None
    href: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None


@dataclass
class FieldLoadMatch:
    id: str


@dataclass
class FieldListMatch:
    description: Optional[str] = None
    field: Optional[str] = None
    href: Optional[str] = None
    id: Optional[int] = None
    image: Optional[str] = None


@dataclass
class Level:
    href: Optional[str] = None
    id: Optional[int] = None
    level: Optional[str] = None


@dataclass
class LevelLoadMatch:
    id: str


@dataclass
class LevelListMatch:
    href: Optional[str] = None
    id: Optional[int] = None
    level: Optional[str] = None


@dataclass
class Skill:
    description: Optional[str] = None
    href: Optional[str] = None
    id: Optional[int] = None
    skill: Optional[str] = None
    translation: Optional[str] = None


@dataclass
class SkillLoadMatch:
    id: str


@dataclass
class SkillListMatch:
    description: Optional[str] = None
    href: Optional[str] = None
    id: Optional[int] = None
    skill: Optional[str] = None
    translation: Optional[str] = None


@dataclass
class Type:
    href: Optional[str] = None
    id: Optional[int] = None
    type: Optional[str] = None


@dataclass
class TypeLoadMatch:
    id: str


@dataclass
class TypeListMatch:
    href: Optional[str] = None
    id: Optional[int] = None
    type: Optional[str] = None

