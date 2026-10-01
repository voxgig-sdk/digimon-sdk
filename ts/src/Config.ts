
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


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
          "title": "Attribute",
          "type": "`$STRING`",
          "short": "Name of the attribute"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the attribute"
        },
        {
          "name": "href",
          "title": "Href",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the attribute"
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
              "kind": "http",
              "method": "GET",
              "orig": "/attribute",
              "segments": [
                {
                  "lit": "attribute"
                }
              ],
              "parts": [
                "attribute"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.content`"
              },
              "args": {
                "query": [
                  {
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/attribute/{idOrName}",
              "segments": [
                {
                  "lit": "attribute"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "attribute",
                "{id}"
              ],
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "idOrName",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
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
          "title": "Attributes",
          "type": "`$ARRAY`"
        },
        {
          "name": "descriptions",
          "title": "Descriptions",
          "type": "`$ARRAY`"
        },
        {
          "name": "fields",
          "title": "Fields",
          "type": "`$ARRAY`"
        },
        {
          "name": "href",
          "title": "Href",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the Digimon"
        },
        {
          "name": "image",
          "title": "Image",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "images",
          "title": "Images",
          "type": "`$ARRAY`"
        },
        {
          "name": "levels",
          "title": "Levels",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the Digimon"
        },
        {
          "name": "nextEvolutions",
          "title": "Next Evolutions",
          "type": "`$ARRAY`"
        },
        {
          "name": "priorEvolutions",
          "title": "Prior Evolutions",
          "type": "`$ARRAY`"
        },
        {
          "name": "releaseDate",
          "title": "Release Date",
          "type": "`$STRING`",
          "format": "date"
        },
        {
          "name": "skills",
          "title": "Skills",
          "type": "`$ARRAY`"
        },
        {
          "name": "types",
          "title": "Types",
          "type": "`$ARRAY`"
        },
        {
          "name": "xAntibody",
          "title": "X Antibody",
          "type": "`$BOOLEAN`",
          "short": "Indicates if the Digimon has X-Antibody"
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
              "kind": "http",
              "method": "GET",
              "orig": "/digimon",
              "segments": [
                {
                  "lit": "digimon"
                }
              ],
              "parts": [
                "digimon"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.content`"
              },
              "args": {
                "query": [
                  {
                    "name": "attribute",
                    "orig": "attribute",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "exact",
                    "orig": "exact",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "level",
                    "orig": "level",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "x_antibody",
                    "orig": "xAntibody",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
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
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/digimon/{idOrName}",
              "segments": [
                {
                  "lit": "digimon"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "digimon",
                "{id}"
              ],
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "idOrName",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
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
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the field"
        },
        {
          "name": "field",
          "title": "Field",
          "type": "`$STRING`",
          "short": "Name of the field"
        },
        {
          "name": "href",
          "title": "Href",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the field"
        },
        {
          "name": "image",
          "title": "Image",
          "type": "`$STRING`",
          "short": "Image URL for the field",
          "format": "uri"
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
              "kind": "http",
              "method": "GET",
              "orig": "/field",
              "segments": [
                {
                  "lit": "field"
                }
              ],
              "parts": [
                "field"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.content`"
              },
              "args": {
                "query": [
                  {
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/field/{idOrName}",
              "segments": [
                {
                  "lit": "field"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "field",
                "{id}"
              ],
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "idOrName",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
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
          "name": "href",
          "title": "Href",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the level"
        },
        {
          "name": "level",
          "title": "Level",
          "type": "`$STRING`",
          "short": "Name of the level"
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
              "kind": "http",
              "method": "GET",
              "orig": "/level",
              "segments": [
                {
                  "lit": "level"
                }
              ],
              "parts": [
                "level"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.content`"
              },
              "args": {
                "query": [
                  {
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/level/{idOrName}",
              "segments": [
                {
                  "lit": "level"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "level",
                "{id}"
              ],
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "idOrName",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
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
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the skill"
        },
        {
          "name": "href",
          "title": "Href",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the skill"
        },
        {
          "name": "skill",
          "title": "Skill",
          "type": "`$STRING`",
          "short": "Name of the skill"
        },
        {
          "name": "translation",
          "title": "Translation",
          "type": "`$STRING`",
          "short": "Translation of the skill name"
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
              "kind": "http",
              "method": "GET",
              "orig": "/skill",
              "segments": [
                {
                  "lit": "skill"
                }
              ],
              "parts": [
                "skill"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.content`"
              },
              "args": {
                "query": [
                  {
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/skill/{idOrName}",
              "segments": [
                {
                  "lit": "skill"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "skill",
                "{id}"
              ],
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "idOrName",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
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
          "name": "href",
          "title": "Href",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the type"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Name of the type"
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
              "kind": "http",
              "method": "GET",
              "orig": "/type",
              "segments": [
                {
                  "lit": "type"
                }
              ],
              "parts": [
                "type"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.content`"
              },
              "args": {
                "query": [
                  {
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "name",
                  "page"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/type/{idOrName}",
              "segments": [
                {
                  "lit": "type"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "type",
                "{id}"
              ],
              "rename": {
                "param": {
                  "idOrName": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "idOrName",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
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

