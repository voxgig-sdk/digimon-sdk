// Typed models for the Digimon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/digimon-sdk/go/core"
)

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

// AttributeListMatch is the typed request payload for Attribute.ListTyped.
type AttributeListMatch struct {
	Attribute *string `json:"attribute,omitempty"`
	Description *string `json:"description,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
}

// Digimon is the typed data model for the digimon entity.
type Digimon struct {
	Attributes *[]any `json:"attributes,omitempty"`
	Descriptions *[]any `json:"descriptions,omitempty"`
	Fields *[]any `json:"fields,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Images *[]any `json:"images,omitempty"`
	Levels *[]any `json:"levels,omitempty"`
	Name *string `json:"name,omitempty"`
	NextEvolutions *[]any `json:"nextEvolutions,omitempty"`
	PriorEvolutions *[]any `json:"priorEvolutions,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
	Types *[]any `json:"types,omitempty"`
	XAntibody *bool `json:"xAntibody,omitempty"`
}

// DigimonLoadMatch is the typed request payload for Digimon.LoadTyped.
type DigimonLoadMatch struct {
	Id string `json:"id"`
}

// DigimonListMatch is the typed request payload for Digimon.ListTyped.
type DigimonListMatch struct {
	Attributes *[]any `json:"attributes,omitempty"`
	Descriptions *[]any `json:"descriptions,omitempty"`
	Fields *[]any `json:"fields,omitempty"`
	Href *string `json:"href,omitempty"`
	Id *int `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Images *[]any `json:"images,omitempty"`
	Levels *[]any `json:"levels,omitempty"`
	Name *string `json:"name,omitempty"`
	NextEvolutions *[]any `json:"nextEvolutions,omitempty"`
	PriorEvolutions *[]any `json:"priorEvolutions,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
	Types *[]any `json:"types,omitempty"`
	XAntibody *bool `json:"xAntibody,omitempty"`
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

// FieldListMatch is the typed request payload for Field.ListTyped.
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

// LevelListMatch is the typed request payload for Level.ListTyped.
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

// SkillListMatch is the typed request payload for Skill.ListTyped.
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

// TypeListMatch is the typed request payload for Type.ListTyped.
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
