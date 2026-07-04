# Digimon TypeScript SDK Reference

Complete API reference for the Digimon TypeScript SDK.


## DigimonSDK

### Constructor

```ts
new DigimonSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DigimonSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = DigimonSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `DigimonSDK` instance in test mode.


### Instance Methods

#### `Attribute(data?: object)`

Create a new `Attribute` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AttributeEntity` instance.

#### `Digimon(data?: object)`

Create a new `Digimon` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DigimonEntity` instance.

#### `Field(data?: object)`

Create a new `Field` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FieldEntity` instance.

#### `Level(data?: object)`

Create a new `Level` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LevelEntity` instance.

#### `Skill(data?: object)`

Create a new `Skill` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SkillEntity` instance.

#### `Type(data?: object)`

Create a new `Type` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TypeEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `DigimonSDK.test()`.

**Returns:** `DigimonSDK` instance in test mode.


---

## AttributeEntity

```ts
const attribute = client.attribute
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribute` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.attribute.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.attribute.load({ id: 'attribute_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AttributeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigimonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DigimonEntity

```ts
const digimon = client.digimon
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.digimon.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.digimon.load({ id: 'digimon_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DigimonEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigimonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FieldEntity

```ts
const field = client.field
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.field.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.field.load({ id: 'field_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FieldEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigimonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LevelEntity

```ts
const level = client.level
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `level` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.level.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.level.load({ id: 'level_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LevelEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigimonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SkillEntity

```ts
const skill = client.skill
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.skill.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.skill.load({ id: 'skill_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SkillEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigimonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TypeEntity

```ts
const type = client.type
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.type.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.type.load({ id: 'type_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TypeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigimonSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new DigimonSDK({
  feature: {
    test: { active: true },
  }
})
```

