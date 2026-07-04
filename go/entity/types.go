// Typed models for the Digimon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Attribute is the typed data model for the attribute entity.
type Attribute struct {
	Attribute *string `json:"attribute,omitempty"`
	Description *string `json:"description,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
}

// AttributeLoadMatch is the typed request payload for Attribute.LoadTyped.
type AttributeLoadMatch struct {
	Id string `json:"id"`
}

// AttributeListMatch mirrors the attribute fields as an all-optional match
// filter (Go analog of Partial<Attribute>).
type AttributeListMatch struct {
	Attribute *string `json:"attribute,omitempty"`
	Description *string `json:"description,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
}

// Digimon is the typed data model for the digimon entity.
type Digimon struct {
	Attribute *[]any `json:"attribute,omitempty"`
	Description *[]any `json:"description,omitempty"`
	Field *[]any `json:"field,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *[]any `json:"image,omitempty"`
	Level *[]any `json:"level,omitempty"`
	Name *string `json:"name,omitempty"`
	NextEvolution *[]any `json:"next_evolution,omitempty"`
	PriorEvolution *[]any `json:"prior_evolution,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Skill *[]any `json:"skill,omitempty"`
	Type *[]any `json:"type,omitempty"`
	XAntibody *bool `json:"x_antibody,omitempty"`
}

// DigimonLoadMatch is the typed request payload for Digimon.LoadTyped.
type DigimonLoadMatch struct {
	Id string `json:"id"`
}

// DigimonListMatch mirrors the digimon fields as an all-optional match
// filter (Go analog of Partial<Digimon>).
type DigimonListMatch struct {
	Attribute *[]any `json:"attribute,omitempty"`
	Description *[]any `json:"description,omitempty"`
	Field *[]any `json:"field,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *[]any `json:"image,omitempty"`
	Level *[]any `json:"level,omitempty"`
	Name *string `json:"name,omitempty"`
	NextEvolution *[]any `json:"next_evolution,omitempty"`
	PriorEvolution *[]any `json:"prior_evolution,omitempty"`
	ReleaseDate *string `json:"release_date,omitempty"`
	Skill *[]any `json:"skill,omitempty"`
	Type *[]any `json:"type,omitempty"`
	XAntibody *bool `json:"x_antibody,omitempty"`
}

// Field is the typed data model for the field entity.
type Field struct {
	Description *string `json:"description,omitempty"`
	Field *string `json:"field,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
}

// FieldLoadMatch is the typed request payload for Field.LoadTyped.
type FieldLoadMatch struct {
	Id string `json:"id"`
}

// FieldListMatch mirrors the field fields as an all-optional match
// filter (Go analog of Partial<Field>).
type FieldListMatch struct {
	Description *string `json:"description,omitempty"`
	Field *string `json:"field,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
}

// Level is the typed data model for the level entity.
type Level struct {
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Level *string `json:"level,omitempty"`
}

// LevelLoadMatch is the typed request payload for Level.LoadTyped.
type LevelLoadMatch struct {
	Id string `json:"id"`
}

// LevelListMatch mirrors the level fields as an all-optional match
// filter (Go analog of Partial<Level>).
type LevelListMatch struct {
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Level *string `json:"level,omitempty"`
}

// Skill is the typed data model for the skill entity.
type Skill struct {
	Description *string `json:"description,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Skill *string `json:"skill,omitempty"`
	Translation *string `json:"translation,omitempty"`
}

// SkillLoadMatch is the typed request payload for Skill.LoadTyped.
type SkillLoadMatch struct {
	Id string `json:"id"`
}

// SkillListMatch mirrors the skill fields as an all-optional match
// filter (Go analog of Partial<Skill>).
type SkillListMatch struct {
	Description *string `json:"description,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Skill *string `json:"skill,omitempty"`
	Translation *string `json:"translation,omitempty"`
}

// Type is the typed data model for the type entity.
type Type struct {
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Type *string `json:"type,omitempty"`
}

// TypeLoadMatch is the typed request payload for Type.LoadTyped.
type TypeLoadMatch struct {
	Id string `json:"id"`
}

// TypeListMatch mirrors the type fields as an all-optional match
// filter (Go analog of Partial<Type>).
type TypeListMatch struct {
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Type *string `json:"type,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
