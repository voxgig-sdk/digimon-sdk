// Typed models for the Digimon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Attribute {
  attribute?: string
  description?: string
  href?: string
  id?: number
}

export interface AttributeLoadMatch {
  id: string
}

export type AttributeListMatch = Partial<Attribute>

export interface Digimon {
  attribute?: any[]
  description?: any[]
  field?: any[]
  href?: string
  id?: number
  image?: any[]
  level?: any[]
  name?: string
  next_evolution?: any[]
  prior_evolution?: any[]
  release_date?: string
  skill?: any[]
  type?: any[]
  x_antibody?: boolean
}

export interface DigimonLoadMatch {
  id: string
}

export type DigimonListMatch = Partial<Digimon>

export interface Field {
  description?: string
  field?: string
  href?: string
  id?: number
  image?: string
}

export interface FieldLoadMatch {
  id: string
}

export type FieldListMatch = Partial<Field>

export interface Level {
  href?: string
  id?: number
  level?: string
}

export interface LevelLoadMatch {
  id: string
}

export type LevelListMatch = Partial<Level>

export interface Skill {
  description?: string
  href?: string
  id?: number
  skill?: string
  translation?: string
}

export interface SkillLoadMatch {
  id: string
}

export type SkillListMatch = Partial<Skill>

export interface Type {
  href?: string
  id?: number
  type?: string
}

export interface TypeLoadMatch {
  id: string
}

export type TypeListMatch = Partial<Type>

