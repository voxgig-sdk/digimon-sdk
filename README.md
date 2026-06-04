# Digimon SDK

Look up Digimon, attributes, levels, fields, types and skills sourced from Wikimon.net

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Digimon API

DAPI (the [Digimon API](https://digi-api.com/)) is a free, community-run REST API that exposes information about the Digimon franchise. It is maintained independently and is not affiliated with Bandai; the underlying data is drawn mainly from [Wikimon.net](https://wikimon.net/).

What you get from the API:

- Paginated listings and detail lookups for individual Digimon by ID or name.
- Reference data for the supporting taxonomy: attributes, fields, levels, types and skills.
- Lookups by either numeric ID or canonical name on every collection.

The service is served from `https://digi-api.com/api/v1` over HTTPS with CORS enabled and does not require authentication or an API key. No formal rate limits are published.

## Try it

**TypeScript**
```bash
npm install digimon
```

**Python**
```bash
pip install digimon-sdk
```

**PHP**
```bash
composer require voxgig/digimon-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/digimon-sdk/go
```

**Ruby**
```bash
gem install digimon-sdk
```

**Lua**
```bash
luarocks install digimon-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { DigimonSDK } from 'digimon'

const client = new DigimonSDK({})

// List all attributes
const attributes = await client.Attribute().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o digimon-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "digimon": {
      "command": "/abs/path/to/digimon-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Attribute** | An attribute classification used by Digimon (e.g. Vaccine, Virus, Data), exposed under `/attribute` and `/attribute/{id-or-name}`. | `/attribute` |
| **Digimon** | A single Digimon creature with its profile data, exposed under `/digimon` (paginated list) and `/digimon/{id-or-name}`. | `/digimon` |
| **Field** | A field grouping that Digimon belong to (in-universe factions), exposed under `/field` and `/field/{id-or-name}`. | `/field` |
| **Level** | An evolution level such as Rookie, Champion, Ultimate or Mega, exposed under `/level` and `/level/{id-or-name}`. | `/level` |
| **Skill** | A named skill or technique that Digimon can use, exposed under `/skill` and `/skill/{id-or-name}`. | `/skill` |
| **Type** | A creature type classification (e.g. Dragon, Beast, Holy), exposed under `/type` and `/type/{id-or-name}`. | `/type` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from digimon_sdk import DigimonSDK

client = DigimonSDK({})

# List all attributes
attributes, err = client.Attribute(None).list(None, None)

# Load a specific attribute
attribute, err = client.Attribute(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'digimon_sdk.php';

$client = new DigimonSDK([]);

// List all attributes
[$attributes, $err] = $client->Attribute(null)->list(null, null);

// Load a specific attribute
[$attribute, $err] = $client->Attribute(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/digimon-sdk/go"

client := sdk.NewDigimonSDK(map[string]any{})

// List all attributes
attributes, err := client.Attribute(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Digimon_sdk"

client = DigimonSDK.new({})

# List all attributes
attributes, err = client.Attribute(nil).list(nil, nil)

# Load a specific attribute
attribute, err = client.Attribute(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("digimon_sdk")

local client = sdk.new({})

-- List all attributes
local attributes, err = client:Attribute(nil):list(nil, nil)

-- Load a specific attribute
local attribute, err = client:Attribute(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = DigimonSDK.test()
const result = await client.Attribute().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = DigimonSDK.test(None, None)
result, err = client.Attribute(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = DigimonSDK::test(null, null);
[$result, $err] = $client->Attribute(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Attribute(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DigimonSDK.test(nil, nil)
result, err = client.Attribute(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Attribute(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Digimon API

- Upstream: [https://digi-api.com/](https://digi-api.com/)

- Data is drawn from official and fan-based sources, primarily [Wikimon.net](https://wikimon.net/), and made available under Creative Commons CC-BY-SA 3.0.
- Digimon is a registered trademark of Bandai. DAPI is an unofficial project and is not affiliated with, endorsed by, or sponsored by Bandai.
- Attribution to Wikimon.net and the DAPI project is expected when redistributing data.
- No franchise materials are claimed as the project's own.

---

Generated from the Digimon API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
