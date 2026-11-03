# Digimon Ruby SDK



The Ruby SDK for the Digimon API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Attribute` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/digimon-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/digimon-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-digimon-sdk", path: "./digimon-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Digimon_sdk"

client = DigimonSDK.new
```

### 3. Load an attribute

```ruby
begin
  # load returns the ENTITY — call data_get for the Attribute record (raises on error).
  attribute = client.Attribute.load({ "id" => "example_id" })
  puts attribute.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  field = client.Field.load({ "id" => "example_id" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = DigimonSDK.test({
  "entity" => { "field" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
field = client.Field.load({ "id" => "test01" })
puts field.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = DigimonSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DIGIMON_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### DigimonSDK

```ruby
require_relative "Digimon_sdk"
client = DigimonSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = DigimonSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### DigimonSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Attribute` | `(data) -> AttributeEntity` | Create an Attribute entity instance. |
| `Digimon` | `(data) -> DigimonEntity` | Create a Digimon entity instance. |
| `Field` | `(data) -> FieldEntity` | Create a Field entity instance. |
| `Level` | `(data) -> LevelEntity` | Create a Level entity instance. |
| `Skill` | `(data) -> SkillEntity` | Create a Skill entity instance. |
| `Type` | `(data) -> TypeEntity` | Create a Type entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`DigimonError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Attribute

| Field | Description |
| --- | --- |
| `attribute` | Name of the attribute |
| `description` | Description of the attribute |
| `fields` |  |
| `id` | Unique identifier for the attribute |
| `name` |  |

Operations: Load.

API path: `/attribute/{idOrName}`

#### Digimon

| Field | Description |
| --- | --- |
| `attributes` |  |
| `descriptions` |  |
| `fields` |  |
| `href` |  |
| `id` | Unique identifier for the Digimon |
| `image` |  |
| `images` |  |
| `levels` |  |
| `name` | Name of the Digimon |
| `nextEvolutions` |  |
| `priorEvolutions` |  |
| `releaseDate` |  |
| `skills` |  |
| `types` |  |
| `xAntibody` | Indicates if the Digimon has X-Antibody |

Operations: List, Load.

API path: `/digimon`

#### Field

| Field | Description |
| --- | --- |
| `description` | Description of the field |
| `field` | Name of the field |
| `fields` |  |
| `id` | Unique identifier for the field |
| `image` | Image URL for the field |
| `name` |  |

Operations: Load.

API path: `/field/{idOrName}`

#### Level

| Field | Description |
| --- | --- |
| `description` |  |
| `fields` |  |
| `id` | Unique identifier for the level |
| `level` | Name of the level |
| `name` |  |

Operations: Load.

API path: `/level/{idOrName}`

#### Skill

| Field | Description |
| --- | --- |
| `description` | Description of the skill |
| `fields` |  |
| `id` | Unique identifier for the skill |
| `name` |  |
| `skill` | Name of the skill |
| `translation` | Translation of the skill name |

Operations: Load.

API path: `/skill/{idOrName}`

#### Type

| Field | Description |
| --- | --- |
| `description` |  |
| `fields` |  |
| `id` | Unique identifier for the type |
| `name` |  |
| `type` | Name of the type |

Operations: Load.

API path: `/type/{idOrName}`



## Entities


### Attribute

Create an instance: `attribute = client.Attribute`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribute` | `String` | Name of the attribute |
| `description` | `String` | Description of the attribute |
| `fields` | `Array` |  |
| `id` | `Integer` | Unique identifier for the attribute |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Attribute record (raises on error).
attribute = client.Attribute.load({ "id" => "attribute_id" })
```


### Digimon

Create an instance: `digimon = client.Digimon`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attributes` | `Array` |  |
| `descriptions` | `Array` |  |
| `fields` | `Array` |  |
| `href` | `String` |  |
| `id` | `Integer` | Unique identifier for the Digimon |
| `image` | `String` |  |
| `images` | `Array` |  |
| `levels` | `Array` |  |
| `name` | `String` | Name of the Digimon |
| `nextEvolutions` | `Array` |  |
| `priorEvolutions` | `Array` |  |
| `releaseDate` | `String` |  |
| `skills` | `Array` |  |
| `types` | `Array` |  |
| `xAntibody` | `Boolean` | Indicates if the Digimon has X-Antibody |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Digimon record (raises on error).
digimon = client.Digimon.load({ "id" => "digimon_id" })
```

#### Example: List

```ruby
# list returns an Array of Digimon entities, one per record (raises on error).
digimons = client.Digimon.list
digimons.each { |item| puts item.data_get }
```


### Field

Create an instance: `field = client.Field`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Description of the field |
| `field` | `String` | Name of the field |
| `fields` | `Array` |  |
| `id` | `Integer` | Unique identifier for the field |
| `image` | `String` | Image URL for the field |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Field record (raises on error).
field = client.Field.load({ "id" => "field_id" })
```


### Level

Create an instance: `level = client.Level`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `fields` | `Array` |  |
| `id` | `Integer` | Unique identifier for the level |
| `level` | `String` | Name of the level |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Level record (raises on error).
level = client.Level.load({ "id" => "level_id" })
```


### Skill

Create an instance: `skill = client.Skill`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Description of the skill |
| `fields` | `Array` |  |
| `id` | `Integer` | Unique identifier for the skill |
| `name` | `String` |  |
| `skill` | `String` | Name of the skill |
| `translation` | `String` | Translation of the skill name |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Skill record (raises on error).
skill = client.Skill.load({ "id" => "skill_id" })
```


### Type

Create an instance: `type = client.Type`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `fields` | `Array` |  |
| `id` | `Integer` | Unique identifier for the type |
| `name` | `String` |  |
| `type` | `String` | Name of the type |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Type record (raises on error).
type = client.Type.load({ "id" => "type_id" })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Digimon_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Digimon_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
field = client.Field
field.load({ "id" => "example_id" })

# field.data_get now returns the field data from the last load
# field.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
