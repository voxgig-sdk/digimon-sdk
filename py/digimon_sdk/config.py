# Digimon SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the attribute",
            "type": "`$INTEGER`",
          },
        ],
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
                "parts": [
                  "attribute",
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
                "parts": [
                  "attribute",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the Digimon",
            "type": "`$INTEGER`",
          },
          {
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
                "parts": [
                  "digimon",
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
                "parts": [
                  "digimon",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "name": "href",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the field",
            "type": "`$INTEGER`",
          },
          {
            "name": "image",
            "short": "Image URL for the field",
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "field",
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
                "parts": [
                  "field",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "level",
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
                "parts": [
                  "level",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "skill",
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
                "parts": [
                  "skill",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "type",
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
                "parts": [
                  "type",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "idOrName": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
