# Digimon SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Digimon",
            "slug": "digimon",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://digi-api.com/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "attribute": {},
                "digimon": {},
                "field": {},
                "level": {},
                "skill": {},
                "type": {},
            },
        },
        "entity": {
      "attribute": {
        "fields": [
          {
            "name": "attribute",
            "short": "Name of the attribute",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Description of the attribute",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the attribute",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "attribute",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/attribute",
                "segments": [
                  {
                    "lit": "attribute",
                  },
                ],
                "select": {
                  "exist": [
                    "name",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "attribute",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id_or_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/attribute/{idOrName}",
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "attribute",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "attribute",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "digimon": {
        "fields": [
          {
            "name": "attributes",
            "type": "`$ARRAY`",
          },
          {
            "name": "descriptions",
            "type": "`$ARRAY`",
          },
          {
            "name": "fields",
            "type": "`$ARRAY`",
          },
          {
            "format": "uri",
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the Digimon",
            "type": "`$INTEGER`",
          },
          {
            "format": "uri",
            "name": "image",
            "type": "`$STRING`",
          },
          {
            "name": "images",
            "type": "`$ARRAY`",
          },
          {
            "name": "levels",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "short": "Name of the Digimon",
            "type": "`$STRING`",
          },
          {
            "name": "nextEvolutions",
            "type": "`$ARRAY`",
          },
          {
            "name": "priorEvolutions",
            "type": "`$ARRAY`",
          },
          {
            "format": "date",
            "name": "releaseDate",
            "type": "`$STRING`",
          },
          {
            "name": "skills",
            "type": "`$ARRAY`",
          },
          {
            "name": "types",
            "type": "`$ARRAY`",
          },
          {
            "name": "xAntibody",
            "short": "Indicates if the Digimon has X-Antibody",
            "type": "`$BOOLEAN`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "digimon",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "attribute",
                      "orig": "attribute",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "exact",
                      "orig": "exact",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "level",
                      "orig": "level",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "x_antibody",
                      "orig": "x_antibody",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/digimon",
                "segments": [
                  {
                    "lit": "digimon",
                  },
                ],
                "select": {
                  "exist": [
                    "attribute",
                    "exact",
                    "level",
                    "name",
                    "page",
                    "page_size",
                    "x_antibody",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "digimon",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id_or_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/digimon/{idOrName}",
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "digimon",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "digimon",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "field": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the field",
            "type": "`$STRING`",
          },
          {
            "name": "field",
            "short": "Name of the field",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the field",
            "type": "`$INTEGER`",
          },
          {
            "format": "uri",
            "name": "image",
            "short": "Image URL for the field",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "field",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/field",
                "segments": [
                  {
                    "lit": "field",
                  },
                ],
                "select": {
                  "exist": [
                    "name",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "field",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id_or_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/field/{idOrName}",
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "field",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "field",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "level": {
        "fields": [
          {
            "format": "uri",
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the level",
            "type": "`$INTEGER`",
          },
          {
            "name": "level",
            "short": "Name of the level",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "level",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/level",
                "segments": [
                  {
                    "lit": "level",
                  },
                ],
                "select": {
                  "exist": [
                    "name",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "level",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id_or_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/level/{idOrName}",
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "level",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "level",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "skill": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the skill",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the skill",
            "type": "`$INTEGER`",
          },
          {
            "name": "skill",
            "short": "Name of the skill",
            "type": "`$STRING`",
          },
          {
            "name": "translation",
            "short": "Translation of the skill name",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "skill",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/skill",
                "segments": [
                  {
                    "lit": "skill",
                  },
                ],
                "select": {
                  "exist": [
                    "name",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "skill",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id_or_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/skill/{idOrName}",
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "skill",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "skill",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "type": {
        "fields": [
          {
            "format": "uri",
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the type",
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "short": "Name of the type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "type",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/type",
                "segments": [
                  {
                    "lit": "type",
                  },
                ],
                "select": {
                  "exist": [
                    "name",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "type",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id_or_name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/type/{idOrName}",
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "type",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "type",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
