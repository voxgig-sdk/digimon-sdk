-- Typed models for the Digimon SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Attribute
---@field attribute? string
---@field description? string
---@field fields? table
---@field id? number
---@field name? string

---@class AttributeLoadMatch
---@field id string

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
---@field fields? table
---@field id? number
---@field image? string
---@field name? string

---@class FieldLoadMatch
---@field id string

---@class Level
---@field description? string
---@field fields? table
---@field id? number
---@field level? string
---@field name? string

---@class LevelLoadMatch
---@field id string

---@class Skill
---@field description? string
---@field fields? table
---@field id? number
---@field name? string
---@field skill? string
---@field translation? string

---@class SkillLoadMatch
---@field id string

---@class Type
---@field description? string
---@field fields? table
---@field id? number
---@field name? string
---@field type? string

---@class TypeLoadMatch
---@field id string

local M = {}

return M
