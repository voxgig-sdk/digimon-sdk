import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "attribute",
    "accessor": "Attribute",
    "op": "load",
    "method": "GET",
    "path": "/attribute/{idOrName}",
    "args": [
      {
        "name": "id",
        "wire": "idOrName",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "attribute": "x",
      "description": "x"
    },
    "idField": "id"
  },
  {
    "entity": "attribute",
    "accessor": "Attribute",
    "op": "load",
    "method": "GET",
    "path": "/attribute",
    "args": [],
    "select": {
      "name": "v1",
      "page": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "name"
    ],
    "queryArgs": [
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "content": {
        "name": "x",
        "description": "x",
        "fields": [
          {
            "id": 1,
            "name": "x",
            "href": "x"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "digimon",
    "accessor": "Digimon",
    "op": "list",
    "method": "GET",
    "path": "/digimon",
    "args": [],
    "select": {
      "attribute": "v1",
      "exact": "v1",
      "level": "v1",
      "name": "v1",
      "page": 0,
      "page_size": 20,
      "x_antibody": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "name",
      "exact",
      "attribute",
      "xAntibody",
      "level",
      "page",
      "pageSize"
    ],
    "queryArgs": [
      {
        "name": "attribute",
        "wire": "attribute"
      },
      {
        "name": "exact",
        "wire": "exact"
      },
      {
        "name": "level",
        "wire": "level"
      },
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      },
      {
        "name": "x_antibody",
        "wire": "xAntibody"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "content": [
        {
          "id": 1,
          "name": "x",
          "href": "x",
          "image": "x"
        }
      ],
      "pageable": {
        "currentPage": 1,
        "elementsOnPage": 1,
        "totalElements": 1,
        "totalPages": 1,
        "previousPage": "x",
        "nextPage": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "digimon",
    "accessor": "Digimon",
    "op": "load",
    "method": "GET",
    "path": "/digimon/{idOrName}",
    "args": [
      {
        "name": "id",
        "wire": "idOrName",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "xAntibody": true,
      "images": [
        {
          "href": "x",
          "transparent": true
        }
      ],
      "levels": [
        {
          "id": 1,
          "level": "x",
          "href": "x"
        }
      ],
      "types": [
        {
          "id": 1,
          "type": "x",
          "href": "x"
        }
      ],
      "attributes": [
        {
          "id": 1,
          "attribute": "x",
          "href": "x"
        }
      ],
      "fields": [
        {
          "id": 1,
          "field": "x",
          "image": "x",
          "href": "x"
        }
      ],
      "releaseDate": "2026-01-01",
      "descriptions": [
        {
          "origin": "x",
          "language": "x",
          "description": "x"
        }
      ],
      "skills": [
        {
          "id": 1,
          "skill": "x",
          "translation": "x",
          "description": "x",
          "href": "x"
        }
      ],
      "priorEvolutions": [
        {
          "id": 1,
          "digimon": "x",
          "condition": "x",
          "image": "x",
          "url": "x"
        }
      ],
      "nextEvolutions": [
        {
          "id": 1,
          "digimon": "x",
          "condition": "x",
          "image": "x",
          "url": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "field",
    "accessor": "Field",
    "op": "load",
    "method": "GET",
    "path": "/field/{idOrName}",
    "args": [
      {
        "name": "id",
        "wire": "idOrName",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "field": "x",
      "image": "x",
      "description": "x"
    },
    "idField": "id"
  },
  {
    "entity": "field",
    "accessor": "Field",
    "op": "load",
    "method": "GET",
    "path": "/field",
    "args": [],
    "select": {
      "name": "v1",
      "page": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "name"
    ],
    "queryArgs": [
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "content": {
        "name": "x",
        "description": "x",
        "fields": [
          {
            "id": 1,
            "name": "x",
            "href": "x"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "level",
    "accessor": "Level",
    "op": "load",
    "method": "GET",
    "path": "/level/{idOrName}",
    "args": [
      {
        "name": "id",
        "wire": "idOrName",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "level": "x"
    },
    "idField": "id"
  },
  {
    "entity": "level",
    "accessor": "Level",
    "op": "load",
    "method": "GET",
    "path": "/level",
    "args": [],
    "select": {
      "name": "v1",
      "page": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "name"
    ],
    "queryArgs": [
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "content": {
        "name": "x",
        "description": "x",
        "fields": [
          {
            "id": 1,
            "name": "x",
            "href": "x"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "skill",
    "accessor": "Skill",
    "op": "load",
    "method": "GET",
    "path": "/skill/{idOrName}",
    "args": [
      {
        "name": "id",
        "wire": "idOrName",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "skill": "x",
      "translation": "x",
      "description": "x"
    },
    "idField": "id"
  },
  {
    "entity": "skill",
    "accessor": "Skill",
    "op": "load",
    "method": "GET",
    "path": "/skill",
    "args": [],
    "select": {
      "name": "v1",
      "page": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "name"
    ],
    "queryArgs": [
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "content": {
        "name": "x",
        "description": "x",
        "fields": [
          {
            "id": 1,
            "name": "x",
            "href": "x"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "type",
    "accessor": "Type",
    "op": "load",
    "method": "GET",
    "path": "/type/{idOrName}",
    "args": [
      {
        "name": "id",
        "wire": "idOrName",
        "value": 1
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "type": "x"
    },
    "idField": "id"
  },
  {
    "entity": "type",
    "accessor": "Type",
    "op": "load",
    "method": "GET",
    "path": "/type",
    "args": [],
    "select": {
      "name": "v1",
      "page": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "name"
    ],
    "queryArgs": [
      {
        "name": "name",
        "wire": "name"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "content": {
        "name": "x",
        "description": "x",
        "fields": [
          {
            "id": 1,
            "name": "x",
            "href": "x"
          }
        ]
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
