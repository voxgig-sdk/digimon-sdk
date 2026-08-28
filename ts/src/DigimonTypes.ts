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

export interface AttributeListMatch {
  name?: string
  page?: number
}

export interface Digimon {
  attributes?: any[]
  descriptions?: any[]
  fields?: any[]
  href?: string
  id?: number
  image?: string
  images?: any[]
  levels?: any[]
  name?: string
  nextEvolutions?: any[]
  priorEvolutions?: any[]
  releaseDate?: string
  skills?: any[]
  types?: any[]
  xAntibody?: boolean
}

export interface DigimonLoadMatch {
  id: string
}

export interface DigimonListMatch {
  attribute?: string
  exact?: boolean
  level?: string
  name?: string
  page?: number
  page_size?: number
  x_antibody?: boolean
}

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

export interface FieldListMatch {
  name?: string
  page?: number
}

export interface Level {
  href?: string
  id?: number
  level?: string
}

export interface LevelLoadMatch {
  id: string
}

export interface LevelListMatch {
  name?: string
  page?: number
}

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

export interface SkillListMatch {
  name?: string
  page?: number
}

export interface Type {
  href?: string
  id?: number
  type?: string
}

export interface TypeLoadMatch {
  id: string
}

export interface TypeListMatch {
  name?: string
  page?: number
}

