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
---@field name? string
---@field page? number

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
---@field attribute? string
---@field exact? boolean
---@field level? string
---@field name? string
---@field page? number
---@field page_size? number
---@field x_antibody? boolean

---@class Field
---@field description? string
---@field field? string
---@field href? string
---@field id? number
---@field image? string

---@class FieldLoadMatch
---@field id string

---@class FieldListMatch
---@field name? string
---@field page? number

---@class Level
---@field href? string
---@field id? number
---@field level? string

---@class LevelLoadMatch
---@field id string

---@class LevelListMatch
---@field name? string
---@field page? number

---@class Skill
---@field description? string
---@field href? string
---@field id? number
---@field skill? string
---@field translation? string

---@class SkillLoadMatch
---@field id string

---@class SkillListMatch
---@field name? string
---@field page? number

---@class Type
---@field href? string
---@field id? number
---@field type? string

---@class TypeLoadMatch
---@field id string

---@class TypeListMatch
---@field name? string
---@field page? number

local M = {}

return M
