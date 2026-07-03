# Digimon TypeScript SDK



The TypeScript SDK for the Digimon API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
npm install @voxgig-sdk/digimon
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DigimonSDK } from 'digimon'

const client = new DigimonSDK({
  apikey: process.env.DIGIMON_APIKEY,
})
```

### 2. List attributes

```ts
const result = await client.Attribute().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a attribute

```ts
const result = await client.Attribute().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DigimonSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new DigimonSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DigimonSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DIGIMON_TEST_LIVE=TRUE
DIGIMON_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### DigimonSDK

#### Constructor

```ts
new DigimonSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Attribute(data?)` | `AttributeEntity` | Create a Attribute entity instance. |
| `Digimon(data?)` | `DigimonEntity` | Create a Digimon entity instance. |
| `Field(data?)` | `FieldEntity` | Create a Field entity instance. |
| `Level(data?)` | `LevelEntity` | Create a Level entity instance. |
| `Skill(data?)` | `SkillEntity` | Create a Skill entity instance. |
| `Type(data?)` | `TypeEntity` | Create a Type entity instance. |
| `tester(testopts?, sdkopts?)` | `DigimonSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DigimonSDK.test(testopts?, sdkopts?)` | `DigimonSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DigimonSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Attribute

| Field | Description |
| --- | --- |
| `attribute` |  |
| `description` |  |
| `href` |  |
| `id` |  |

Operations: list, load.

API path: `/attribute`

#### Digimon

| Field | Description |
| --- | --- |
| `attribute` |  |
| `description` |  |
| `field` |  |
| `href` |  |
| `id` |  |
| `image` |  |
| `level` |  |
| `name` |  |
| `next_evolution` |  |
| `prior_evolution` |  |
| `release_date` |  |
| `skill` |  |
| `type` |  |
| `x_antibody` |  |

Operations: list, load.

API path: `/digimon`

#### Field

| Field | Description |
| --- | --- |
| `description` |  |
| `field` |  |
| `href` |  |
| `id` |  |
| `image` |  |

Operations: list, load.

API path: `/field`

#### Level

| Field | Description |
| --- | --- |
| `href` |  |
| `id` |  |
| `level` |  |

Operations: list, load.

API path: `/level`

#### Skill

| Field | Description |
| --- | --- |
| `description` |  |
| `href` |  |
| `id` |  |
| `skill` |  |
| `translation` |  |

Operations: list, load.

API path: `/skill`

#### Type

| Field | Description |
| --- | --- |
| `href` |  |
| `id` |  |
| `type` |  |

Operations: list, load.

API path: `/type`



## Entities


### Attribute

Create an instance: `const attribute = client.Attribute()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribute` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `href` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |

#### Example: Load

```ts
const attribute = await client.Attribute().load({ id: 'attribute_id' })
```

#### Example: List

```ts
const attributes = await client.Attribute().list()
```


### Digimon

Create an instance: `const digimon = client.Digimon()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribute` | ``$ARRAY`` |  |
| `description` | ``$ARRAY`` |  |
| `field` | ``$ARRAY`` |  |
| `href` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `image` | ``$ARRAY`` |  |
| `level` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `next_evolution` | ``$ARRAY`` |  |
| `prior_evolution` | ``$ARRAY`` |  |
| `release_date` | ``$STRING`` |  |
| `skill` | ``$ARRAY`` |  |
| `type` | ``$ARRAY`` |  |
| `x_antibody` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const digimon = await client.Digimon().load({ id: 'digimon_id' })
```

#### Example: List

```ts
const digimons = await client.Digimon().list()
```


### Field

Create an instance: `const field = client.Field()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `field` | ``$STRING`` |  |
| `href` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `image` | ``$STRING`` |  |

#### Example: Load

```ts
const field = await client.Field().load({ id: 'field_id' })
```

#### Example: List

```ts
const fields = await client.Field().list()
```


### Level

Create an instance: `const level = client.Level()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `href` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `level` | ``$STRING`` |  |

#### Example: Load

```ts
const level = await client.Level().load({ id: 'level_id' })
```

#### Example: List

```ts
const levels = await client.Level().list()
```


### Skill

Create an instance: `const skill = client.Skill()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `href` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `skill` | ``$STRING`` |  |
| `translation` | ``$STRING`` |  |

#### Example: Load

```ts
const skill = await client.Skill().load({ id: 'skill_id' })
```

#### Example: List

```ts
const skills = await client.Skill().list()
```


### Type

Create an instance: `const type = client.Type()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `href` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ts
const type = await client.Type().load({ id: 'type_id' })
```

#### Example: List

```ts
const types = await client.Type().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
digimon/
├── src/
│   ├── DigimonSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DigimonSDK } from 'digimon'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
