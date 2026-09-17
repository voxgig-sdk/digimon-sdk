
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Digimon',
        slug: "digimon",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://digi-api.com/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        attribute: {
        },
  
        digimon: {
        },
  
        field: {
        },
  
        level: {
        },
  
        skill: {
        },
  
        type: {
        },
  
    }
  }


  entity = {
    "attribute": {
      "fields": [
        {
          "name": "attribute",
          "short": "Name of the attribute",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Description of the attribute",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "href",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the attribute",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/attribute",
              "segments": [
                {
                  "lit": "attribute"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "attribute"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/attribute/{idOrName}",
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "segments": [
                {
                  "lit": "attribute"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "attribute",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "digimon": {
      "fields": [
        {
          "name": "attributes",
          "type": "`$ARRAY`"
        },
        {
          "name": "descriptions",
          "type": "`$ARRAY`"
        },
        {
          "name": "fields",
          "type": "`$ARRAY`"
        },
        {
          "format": "uri",
          "name": "href",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the Digimon",
          "type": "`$INTEGER`"
        },
        {
          "format": "uri",
          "name": "image",
          "type": "`$STRING`"
        },
        {
          "name": "images",
          "type": "`$ARRAY`"
        },
        {
          "name": "levels",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "short": "Name of the Digimon",
          "type": "`$STRING`"
        },
        {
          "name": "nextEvolutions",
          "type": "`$ARRAY`"
        },
        {
          "name": "priorEvolutions",
          "type": "`$ARRAY`"
        },
        {
          "format": "date",
          "name": "releaseDate",
          "type": "`$STRING`"
        },
        {
          "name": "skills",
          "type": "`$ARRAY`"
        },
        {
          "name": "types",
          "type": "`$ARRAY`"
        },
        {
          "name": "xAntibody",
          "short": "Indicates if the Digimon has X-Antibody",
          "type": "`$BOOLEAN`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "exact",
                    "orig": "exact",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "level",
                    "orig": "level",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "x_antibody",
                    "orig": "x_antibody",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/digimon",
              "segments": [
                {
                  "lit": "digimon"
                }
              ],
              "select": {
                "exist": [
                  "attribute",
                  "exact",
                  "level",
                  "name",
                  "page",
                  "page_size",
                  "x_antibody"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "digimon"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/digimon/{idOrName}",
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "segments": [
                {
                  "lit": "digimon"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "digimon",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "field": {
      "fields": [
        {
          "name": "description",
          "short": "Description of the field",
          "type": "`$STRING`"
        },
        {
          "name": "field",
          "short": "Name of the field",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "href",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the field",
          "type": "`$INTEGER`"
        },
        {
          "format": "uri",
          "name": "image",
          "short": "Image URL for the field",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/field",
              "segments": [
                {
                  "lit": "field"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "field"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/field/{idOrName}",
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "segments": [
                {
                  "lit": "field"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "field",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "level": {
      "fields": [
        {
          "format": "uri",
          "name": "href",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the level",
          "type": "`$INTEGER`"
        },
        {
          "name": "level",
          "short": "Name of the level",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/level",
              "segments": [
                {
                  "lit": "level"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "level"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/level/{idOrName}",
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "segments": [
                {
                  "lit": "level"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "level",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "skill": {
      "fields": [
        {
          "name": "description",
          "short": "Description of the skill",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "href",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the skill",
          "type": "`$INTEGER`"
        },
        {
          "name": "skill",
          "short": "Name of the skill",
          "type": "`$STRING`"
        },
        {
          "name": "translation",
          "short": "Translation of the skill name",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/skill",
              "segments": [
                {
                  "lit": "skill"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "skill"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/skill/{idOrName}",
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "segments": [
                {
                  "lit": "skill"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "skill",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "type": {
      "fields": [
        {
          "format": "uri",
          "name": "href",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the type",
          "type": "`$INTEGER`"
        },
        {
          "name": "type",
          "short": "Name of the type",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/type",
              "segments": [
                {
                  "lit": "type"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "type"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/type/{idOrName}",
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "segments": [
                {
                  "lit": "type"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "type",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

