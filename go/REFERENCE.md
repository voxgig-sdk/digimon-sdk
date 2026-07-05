# Digimon Golang SDK Reference

Complete API reference for the Digimon Golang SDK.


## DigimonSDK

### Constructor

```go
func NewDigimonSDK(options map[string]any) *DigimonSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *DigimonSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *DigimonSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Attribute(data map[string]any) DigimonEntity`

Create a new `Attribute` entity instance. Pass `nil` for no initial data.

#### `Digimon(data map[string]any) DigimonEntity`

Create a new `Digimon` entity instance. Pass `nil` for no initial data.

#### `Field(data map[string]any) DigimonEntity`

Create a new `Field` entity instance. Pass `nil` for no initial data.

#### `Level(data map[string]any) DigimonEntity`

Create a new `Level` entity instance. Pass `nil` for no initial data.

#### `Skill(data map[string]any) DigimonEntity`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `Type(data map[string]any) DigimonEntity`

Create a new `Type` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AttributeEntity

```go
attribute := client.Attribute(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribute` | `string` | No |  |
| `description` | `string` | No |  |
| `href` | `string` | No |  |
| `id` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Attribute(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Attribute(nil).Load(map[string]any{"id": "attribute_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AttributeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DigimonEntity

```go
digimon := client.Digimon(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribute` | `[]any` | No |  |
| `description` | `[]any` | No |  |
| `field` | `[]any` | No |  |
| `href` | `string` | No |  |
| `id` | `int` | No |  |
| `image` | `[]any` | No |  |
| `level` | `[]any` | No |  |
| `name` | `string` | No |  |
| `next_evolution` | `[]any` | No |  |
| `prior_evolution` | `[]any` | No |  |
| `release_date` | `string` | No |  |
| `skill` | `[]any` | No |  |
| `type` | `[]any` | No |  |
| `x_antibody` | `bool` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Digimon(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Digimon(nil).Load(map[string]any{"id": "digimon_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DigimonEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FieldEntity

```go
field := client.Field(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `field` | `string` | No |  |
| `href` | `string` | No |  |
| `id` | `int` | No |  |
| `image` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Field(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Field(nil).Load(map[string]any{"id": "field_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FieldEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LevelEntity

```go
level := client.Level(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | No |  |
| `id` | `int` | No |  |
| `level` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Level(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Level(nil).Load(map[string]any{"id": "level_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LevelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SkillEntity

```go
skill := client.Skill(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `href` | `string` | No |  |
| `id` | `int` | No |  |
| `skill` | `string` | No |  |
| `translation` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Skill(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Skill(nil).Load(map[string]any{"id": "skill_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TypeEntity

```go
type := client.Type(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | No |  |
| `id` | `int` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Type(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Type(nil).Load(map[string]any{"id": "type_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TypeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewDigimonSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

