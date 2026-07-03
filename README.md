# Digimon SDK

Digimon API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { DigimonSDK } from 'digimon'

const client = new DigimonSDK({
  apikey: process.env.DIGIMON_APIKEY,
})

// List all attributes
const attributes = await client.Attribute().list()
console.log(attributes.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Attribute** |  | `/attribute` |
| **Digimon** |  | `/digimon` |
| **Field** |  | `/field` |
| **Level** |  | `/level` |
| **Skill** |  | `/skill` |
| **Type** |  | `/type` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from digimon_sdk import DigimonSDK

client = DigimonSDK({
    "apikey": os.environ.get("DIGIMON_APIKEY"),
})

# List all attributes
attributes, err = client.Attribute().list()
print(attributes)

# Load a specific attribute
attribute, err = client.Attribute().load({"id": "example_id"})
print(attribute)
```

### PHP

```php
<?php
require_once 'digimon_sdk.php';

$client = new DigimonSDK([
    "apikey" => getenv("DIGIMON_APIKEY"),
]);

// List all attributes
[$attributes, $err] = $client->Attribute()->list();
print_r($attributes);

// Load a specific attribute
[$attribute, $err] = $client->Attribute()->load(["id" => "example_id"]);
print_r($attribute);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/digimon-sdk/go"

client := sdk.NewDigimonSDK(map[string]any{
    "apikey": os.Getenv("DIGIMON_APIKEY"),
})

// List all attributes
attributes, err := client.Attribute(nil).List(nil, nil)
fmt.Println(attributes)
```

### Ruby

```ruby
require_relative "Digimon_sdk"

client = DigimonSDK.new({
  "apikey" => ENV["DIGIMON_APIKEY"],
})

# List all attributes
attributes, err = client.Attribute().list
puts attributes

# Load a specific attribute
attribute, err = client.Attribute().load({ "id" => "example_id" })
puts attribute
```

### Lua

```lua
local sdk = require("digimon_sdk")

local client = sdk.new({
  apikey = os.getenv("DIGIMON_APIKEY"),
})

-- List all attributes
local attributes, err = client:Attribute():list()
print(attributes)

-- Load a specific attribute
local attribute, err = client:Attribute():load({ id = "example_id" })
print(attribute)
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
client = DigimonSDK.test()
result, err = client.Attribute().load({"id": "test01"})
```

### PHP

```php
$client = DigimonSDK::test();
[$result, $err] = $client->Attribute()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Attribute(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DigimonSDK.test
result, err = client.Attribute().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Attribute():load({ id = "test01" })
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

---

Generated from the Digimon API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
