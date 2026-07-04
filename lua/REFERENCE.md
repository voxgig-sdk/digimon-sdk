# Digimon Lua SDK Reference

Complete API reference for the Digimon Lua SDK.


## DigimonSDK

### Constructor

```lua
local sdk = require("digimon_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Attribute(data)`

Create a new `Attribute` entity instance. Pass `nil` for no initial data.

#### `Digimon(data)`

Create a new `Digimon` entity instance. Pass `nil` for no initial data.

#### `Field(data)`

Create a new `Field` entity instance. Pass `nil` for no initial data.

#### `Level(data)`

Create a new `Level` entity instance. Pass `nil` for no initial data.

#### `Skill(data)`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `Type(data)`

Create a new `Type` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AttributeEntity

```lua
local attribute = client:Attribute(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribute` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Attribute():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Attribute():load({ id = "attribute_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AttributeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DigimonEntity

```lua
local digimon = client:Digimon(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribute` | ``$ARRAY`` | No |  |
| `description` | ``$ARRAY`` | No |  |
| `field` | ``$ARRAY`` | No |  |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image` | ``$ARRAY`` | No |  |
| `level` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `next_evolution` | ``$ARRAY`` | No |  |
| `prior_evolution` | ``$ARRAY`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `skill` | ``$ARRAY`` | No |  |
| `type` | ``$ARRAY`` | No |  |
| `x_antibody` | ``$BOOLEAN`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Digimon():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Digimon():load({ id = "digimon_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigimonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FieldEntity

```lua
local field = client:Field(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `field` | ``$STRING`` | No |  |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Field():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Field():load({ id = "field_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FieldEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LevelEntity

```lua
local level = client:Level(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `level` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Level():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Level():load({ id = "level_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LevelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SkillEntity

```lua
local skill = client:Skill(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `skill` | ``$STRING`` | No |  |
| `translation` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Skill():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Skill():load({ id = "skill_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TypeEntity

```lua
local type = client:Type(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Type():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Type():load({ id = "type_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TypeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

