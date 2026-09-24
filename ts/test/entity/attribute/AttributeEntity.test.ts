

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DigimonSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AttributeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGIMON_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGIMON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigimonSDK.test()
    const ent = testsdk.Attribute()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGIMON_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'attribute.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attribute":{"a":true,"h":"Attribute","n":"attribute","r":false,"sh":"Name of the attribute","t":"`$STRING`","key$":"attribute","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the attribute","t":"`$STRING`","key$":"description","index$":1},"href":{"a":true,"fo":"uri","h":"Href","n":"href","r":false,"t":"`$STRING`","key$":"href","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the attribute","t":"`$INTEGER`","key$":"id","index$":3}},"id":{"field":"id","name":"id"},"name":"attribute","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /attribute","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/attribute","q":{"exist":["name","page"]},"r":{},"s":[{"lit":"attribute"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /attribute/{idOrName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id_or_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/attribute/{idOrName}","q":{"exist":["id"]},"r":{"param":{"idOrName":"id"}},"s":[{"lit":"attribute"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"attribute","name__orig":"attribute","Name":"Attribute","name_":"attribute","name-":"attribute","NAME":"ATTRIBUTE","index$":0}, {"active":true,"entity":"attribute","key$":"BasicAttributeFlow","kind":"basic","name":"BasicAttributeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"attribute_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"attribute_ref01","srcdatavar":"attribute_ref01_data","suffix":"_dt0"},"m":{"id":"attribute01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-attribute_ref01"}}],"index$":1}]}, 'Attribute', {"GET /attribute":{"protocol":"http","operationId":"getAttributeList","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"content":{"items":{"properties":{"attribute":{"type":"string","key$":"attribute"},"href":{"format":"uri","type":"string","key$":"href"},"id":{"type":"integer","key$":"id"}},"type":"object","x-ref":"#/components/schemas/AttributeReference","index$":0},"key$":"content","type":"array"},"pageable":{"key$":"pageable","properties":{"currentPage":{"type":"integer"},"elementsOnPage":{"type":"integer"},"nextPage":{"format":"uri","nullable":true,"type":"string"},"previousPage":{"format":"uri","nullable":true,"type":"string"},"totalElements":{"type":"integer"},"totalPages":{"type":"integer"}},"type":"object","x-ref":"#/components/schemas/Pageable"}},"x-ref":"#/components/schemas/AttributeList"}}}}},"parameters":[{"name":"page","in":"query","description":"Used to navigate to a specific page","schema":{"type":"integer","default":0},"index$":0},{"name":"name","in":"query","description":"Returns a list of attributes that have a similar name to the value","schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /attribute/{idOrName}":{"protocol":"http","operationId":"getAttribute","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the attribute","key$":"id"},"attribute":{"type":"string","description":"Name of the attribute","key$":"attribute"},"description":{"type":"string","description":"Description of the attribute","key$":"description"}},"x-ref":"#/components/schemas/Attribute","index$":0}}}},"404":{"description":"Attribute not found"}},"parameters":[{"name":"idOrName","in":"path","required":true,"description":"Attribute unique ID or name","schema":{"oneOf":[{"type":"integer"},{"type":"string"}]},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let attribute_ref01_data = Object.values(setup.data.existing.attribute)[0] as any

    // LIST
    const attribute_ref01_ent = client.Attribute()
    const attribute_ref01_match: any = {}

    const attribute_ref01_list = (await attribute_ref01_ent.list(attribute_ref01_match)).map((e: any) => e.data())


    // LOAD
    const attribute_ref01_match_dt0: any = {}
    attribute_ref01_match_dt0.id = attribute_ref01_data.id
    const attribute_ref01_data_dt0 = (await attribute_ref01_ent.load(attribute_ref01_match_dt0)).data()
    assert(attribute_ref01_data_dt0.id === attribute_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/attribute/AttributeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DigimonSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['attribute01','attribute02','attribute03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGIMON_TEST_ATTRIBUTE_ENTID': idmap,
    'DIGIMON_TEST_LIVE': 'FALSE',
    'DIGIMON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DIGIMON_TEST_ATTRIBUTE_ENTID']

  const live = 'TRUE' === env.DIGIMON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGIMON_TEST_ATTRIBUTE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DigimonSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DIGIMON_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
