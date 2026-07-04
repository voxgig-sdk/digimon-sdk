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

---@class Digimon
---@field attribute? table
---@field description? table
---@field field? table
---@field href? string
---@field id? number
---@field image? table
---@field level? table
---@field name? string
---@field next_evolution? table
---@field prior_evolution? table
---@field release_date? string
---@field skill? table
---@field type? table
---@field x_antibody? boolean

---@class DigimonLoadMatch
---@field id string

---@class DigimonListMatch

---@class Field
---@field description? string
---@field field? string
---@field href? string
---@field id? number
---@field image? string

---@class FieldLoadMatch
---@field id string

---@class FieldListMatch

---@class Level
---@field href? string
---@field id? number
---@field level? string

---@class LevelLoadMatch
---@field id string

---@class LevelListMatch

---@class Skill
---@field description? string
---@field href? string
---@field id? number
---@field skill? string
---@field translation? string

---@class SkillLoadMatch
---@field id string

---@class SkillListMatch

---@class Type
---@field href? string
---@field id? number
---@field type? string

---@class TypeLoadMatch
---@field id string

---@class TypeListMatch

local M = {}

return M
