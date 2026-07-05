# frozen_string_literal: true

# Typed models for the Digimon SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Attribute entity data model.
#
# @!attribute [rw] attribute
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
Attribute = Struct.new(
  :attribute,
  :description,
  :href,
  :id,
  keyword_init: true
)

# Request payload for Attribute#load.
#
# @!attribute [rw] id
#   @return [String]
AttributeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Attribute#list.
#
# @!attribute [rw] attribute
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
AttributeListMatch = Struct.new(
  :attribute,
  :description,
  :href,
  :id,
  keyword_init: true
)

# Digimon entity data model.
#
# @!attribute [rw] attribute
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [Array, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [Array, nil]
#
# @!attribute [rw] level
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_evolution
#   @return [Array, nil]
#
# @!attribute [rw] prior_evolution
#   @return [Array, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] skill
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
#
# @!attribute [rw] x_antibody
#   @return [Boolean, nil]
Digimon = Struct.new(
  :attribute,
  :description,
  :field,
  :href,
  :id,
  :image,
  :level,
  :name,
  :next_evolution,
  :prior_evolution,
  :release_date,
  :skill,
  :type,
  :x_antibody,
  keyword_init: true
)

# Request payload for Digimon#load.
#
# @!attribute [rw] id
#   @return [String]
DigimonLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Digimon#list.
#
# @!attribute [rw] attribute
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [Array, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [Array, nil]
#
# @!attribute [rw] level
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_evolution
#   @return [Array, nil]
#
# @!attribute [rw] prior_evolution
#   @return [Array, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] skill
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [Array, nil]
#
# @!attribute [rw] x_antibody
#   @return [Boolean, nil]
DigimonListMatch = Struct.new(
  :attribute,
  :description,
  :field,
  :href,
  :id,
  :image,
  :level,
  :name,
  :next_evolution,
  :prior_evolution,
  :release_date,
  :skill,
  :type,
  :x_antibody,
  keyword_init: true
)

# Field entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
Field = Struct.new(
  :description,
  :field,
  :href,
  :id,
  :image,
  keyword_init: true
)

# Request payload for Field#load.
#
# @!attribute [rw] id
#   @return [String]
FieldLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Field#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
FieldListMatch = Struct.new(
  :description,
  :field,
  :href,
  :id,
  :image,
  keyword_init: true
)

# Level entity data model.
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] level
#   @return [String, nil]
Level = Struct.new(
  :href,
  :id,
  :level,
  keyword_init: true
)

# Request payload for Level#load.
#
# @!attribute [rw] id
#   @return [String]
LevelLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Level#list.
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] level
#   @return [String, nil]
LevelListMatch = Struct.new(
  :href,
  :id,
  :level,
  keyword_init: true
)

# Skill entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] skill
#   @return [String, nil]
#
# @!attribute [rw] translation
#   @return [String, nil]
Skill = Struct.new(
  :description,
  :href,
  :id,
  :skill,
  :translation,
  keyword_init: true
)

# Request payload for Skill#load.
#
# @!attribute [rw] id
#   @return [String]
SkillLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Skill#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] skill
#   @return [String, nil]
#
# @!attribute [rw] translation
#   @return [String, nil]
SkillListMatch = Struct.new(
  :description,
  :href,
  :id,
  :skill,
  :translation,
  keyword_init: true
)

# Type entity data model.
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Type = Struct.new(
  :href,
  :id,
  :type,
  keyword_init: true
)

# Request payload for Type#load.
#
# @!attribute [rw] id
#   @return [String]
TypeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Type#list.
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
TypeListMatch = Struct.new(
  :href,
  :id,
  :type,
  keyword_init: true
)

