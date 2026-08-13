-- Typed models for the Digimon SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Attribute
---@field attribute? string
---@field description? string
---@field href? string
---@field id? number

---@class AttributeLoadMatch
---@field id string

---@class AttributeListMatch
---@field attribute? string
---@field description? string
---@field href? string
---@field id? number

---@class Digimon
---@field attributes? table
---@field descriptions? table
---@field fields? table
---@field href? string
---@field id? number
---@field image? string
---@field images? table
---@field levels? table
---@field name? string
---@field nextEvolutions? table
---@field priorEvolutions? table
---@field releaseDate? string
---@field skills? table
---@field types? table
---@field xAntibody? boolean

---@class DigimonLoadMatch
---@field id string

---@class DigimonListMatch
---@field attributes? table
---@field descriptions? table
---@field fields? table
---@field href? string
---@field id? number
---@field image? string
---@field images? table
---@field levels? table
---@field name? string
---@field nextEvolutions? table
---@field priorEvolutions? table
---@field releaseDate? string
---@field skills? table
---@field types? table
---@field xAntibody? boolean

---@class Field
---@field description? string
---@field field? string
---@field href? string
---@field id? number
---@field image? string

---@class FieldLoadMatch
---@field id string

---@class FieldListMatch
---@field description? string
---@field field? string
---@field href? string
---@field id? number
---@field image? string

---@class Level
---@field href? string
---@field id? number
---@field level? string

---@class LevelLoadMatch
---@field id string

---@class LevelListMatch
---@field href? string
---@field id? number
---@field level? string

---@class Skill
---@field description? string
---@field href? string
---@field id? number
---@field skill? string
---@field translation? string

---@class SkillLoadMatch
---@field id string

---@class SkillListMatch
---@field description? string
---@field href? string
---@field id? number
---@field skill? string
---@field translation? string

---@class Type
---@field href? string
---@field id? number
---@field type? string

---@class TypeLoadMatch
---@field id string

---@class TypeListMatch
---@field href? string
---@field id? number
---@field type? string

local M = {}

return M
