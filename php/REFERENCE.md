# Digimon PHP SDK Reference

Complete API reference for the Digimon PHP SDK.


## DigimonSDK

### Constructor

```php
require_once __DIR__ . '/digimon_sdk.php';

$client = new DigimonSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DigimonSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = DigimonSDK::test();
```


### Instance Methods

#### `Attribute($data = null)`

Create a new `AttributeEntity` instance. Pass `null` for no initial data.

#### `Digimon($data = null)`

Create a new `DigimonEntity` instance. Pass `null` for no initial data.

#### `Field($data = null)`

Create a new `FieldEntity` instance. Pass `null` for no initial data.

#### `Level($data = null)`

Create a new `LevelEntity` instance. Pass `null` for no initial data.

#### `Skill($data = null)`

Create a new `SkillEntity` instance. Pass `null` for no initial data.

#### `Type($data = null)`

Create a new `TypeEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): DigimonUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AttributeEntity

```php
$attribute = $client->Attribute();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribute` | `string` | No |  |
| `description` | `string` | No |  |
| `href` | `string` | No |  |
| `id` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Attribute()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Attribute()->load(["id" => "attribute_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AttributeEntity`

Create a new `AttributeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DigimonEntity

```php
$digimon = $client->Digimon();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribute` | `array` | No |  |
| `description` | `array` | No |  |
| `field` | `array` | No |  |
| `href` | `string` | No |  |
| `id` | `int` | No |  |
| `image` | `array` | No |  |
| `level` | `array` | No |  |
| `name` | `string` | No |  |
| `next_evolution` | `array` | No |  |
| `prior_evolution` | `array` | No |  |
| `release_date` | `string` | No |  |
| `skill` | `array` | No |  |
| `type` | `array` | No |  |
| `x_antibody` | `bool` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Digimon()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Digimon()->load(["id" => "digimon_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DigimonEntity`

Create a new `DigimonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FieldEntity

```php
$field = $client->Field();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Field()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Field()->load(["id" => "field_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FieldEntity`

Create a new `FieldEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LevelEntity

```php
$level = $client->Level();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | No |  |
| `id` | `int` | No |  |
| `level` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Level()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Level()->load(["id" => "level_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LevelEntity`

Create a new `LevelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SkillEntity

```php
$skill = $client->Skill();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Skill()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Skill()->load(["id" => "skill_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SkillEntity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TypeEntity

```php
$type = $client->Type();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | `string` | No |  |
| `id` | `int` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Type()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Type()->load(["id" => "type_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TypeEntity`

Create a new `TypeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new DigimonSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

