package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Digimon",
			"slug": "digimon",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://digi-api.com/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"attribute": map[string]any{},
				"digimon": map[string]any{},
				"field": map[string]any{},
				"level": map[string]any{},
				"skill": map[string]any{},
				"type": map[string]any{},
			},
		},
		"entity": map[string]any{
			"attribute": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attribute",
						"title": "Attribute",
						"type": "`$STRING`",
						"short": "Name of the attribute",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the attribute",
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the attribute",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "attribute",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/attribute",
								"segments": []any{
									map[string]any{
										"lit": "attribute",
									},
								},
								"parts": []any{
									"attribute",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"page",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/attribute/{idOrName}",
								"segments": []any{
									map[string]any{
										"lit": "attribute",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"attribute",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"idOrName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id_or_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"digimon": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attributes",
						"title": "Attributes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "descriptions",
						"title": "Descriptions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "fields",
						"title": "Fields",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the Digimon",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "images",
						"title": "Images",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "levels",
						"title": "Levels",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the Digimon",
					},
					map[string]any{
						"name": "nextEvolutions",
						"title": "Next Evolutions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "priorEvolutions",
						"title": "Prior Evolutions",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "releaseDate",
						"title": "Release Date",
						"type": "`$STRING`",
						"format": "date",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "types",
						"title": "Types",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "xAntibody",
						"title": "X Antibody",
						"type": "`$BOOLEAN`",
						"short": "Indicates if the Digimon has X-Antibody",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "digimon",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/digimon",
								"segments": []any{
									map[string]any{
										"lit": "digimon",
									},
								},
								"parts": []any{
									"digimon",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "attribute",
											"orig": "attribute",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "exact",
											"orig": "exact",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "level",
											"orig": "level",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "x_antibody",
											"orig": "x_antibody",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"attribute",
										"exact",
										"level",
										"name",
										"page",
										"page_size",
										"x_antibody",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/digimon/{idOrName}",
								"segments": []any{
									map[string]any{
										"lit": "digimon",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"digimon",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"idOrName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id_or_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"field": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the field",
					},
					map[string]any{
						"name": "field",
						"title": "Field",
						"type": "`$STRING`",
						"short": "Name of the field",
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the field",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$STRING`",
						"short": "Image URL for the field",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "field",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/field",
								"segments": []any{
									map[string]any{
										"lit": "field",
									},
								},
								"parts": []any{
									"field",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"page",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/field/{idOrName}",
								"segments": []any{
									map[string]any{
										"lit": "field",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"field",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"idOrName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id_or_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"level": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the level",
					},
					map[string]any{
						"name": "level",
						"title": "Level",
						"type": "`$STRING`",
						"short": "Name of the level",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "level",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/level",
								"segments": []any{
									map[string]any{
										"lit": "level",
									},
								},
								"parts": []any{
									"level",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"page",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/level/{idOrName}",
								"segments": []any{
									map[string]any{
										"lit": "level",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"level",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"idOrName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id_or_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"skill": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the skill",
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the skill",
					},
					map[string]any{
						"name": "skill",
						"title": "Skill",
						"type": "`$STRING`",
						"short": "Name of the skill",
					},
					map[string]any{
						"name": "translation",
						"title": "Translation",
						"type": "`$STRING`",
						"short": "Translation of the skill name",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "skill",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/skill",
								"segments": []any{
									map[string]any{
										"lit": "skill",
									},
								},
								"parts": []any{
									"skill",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"page",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/skill/{idOrName}",
								"segments": []any{
									map[string]any{
										"lit": "skill",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"skill",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"idOrName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id_or_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"type": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the type",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Name of the type",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "type",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/type",
								"segments": []any{
									map[string]any{
										"lit": "type",
									},
								},
								"parts": []any{
									"type",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"page",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/type/{idOrName}",
								"segments": []any{
									map[string]any{
										"lit": "type",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"type",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"idOrName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id_or_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
