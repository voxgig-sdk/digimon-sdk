

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


describe('FieldEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGIMON_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGIMON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigimonSDK.test()
    const ent = testsdk.Field()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGIMON_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'field.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the field","t":"`$STRING`","key$":"description","index$":0},"field":{"a":true,"h":"Field","n":"field","r":false,"sh":"Name of the field","t":"`$STRING`","key$":"field","index$":1},"href":{"a":true,"fo":"uri","h":"Href","n":"href","r":false,"t":"`$STRING`","key$":"href","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the field","t":"`$INTEGER`","key$":"id","index$":3},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"sh":"Image URL for the field","t":"`$STRING`","key$":"image","index$":4}},"id":{"field":"id","name":"id"},"name":"field","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /field","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/field","q":{"exist":["name","page"]},"r":{},"s":[{"lit":"field"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /field/{idOrName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id_or_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/field/{idOrName}","q":{"exist":["id"]},"r":{"param":{"idOrName":"id"}},"s":[{"lit":"field"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"field","name__orig":"field","Name":"Field","name_":"field","name-":"field","NAME":"FIELD","index$":2}, {"active":true,"entity":"field","key$":"BasicFieldFlow","kind":"basic","name":"BasicFieldFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"field_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"field_ref01","srcdatavar":"field_ref01_data","suffix":"_dt0"},"m":{"id":"field01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-field_ref01"}}],"index$":1}]}, 'Field', {"GET /field":{"protocol":"http","operationId":"getFieldList","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"content":{"items":{"properties":{"field":{"type":"string","key$":"field"},"href":{"format":"uri","type":"string","key$":"href"},"id":{"type":"integer","key$":"id"},"image":{"format":"uri","type":"string","key$":"image"}},"type":"object","x-ref":"#/components/schemas/FieldReference","index$":0},"key$":"content","type":"array"},"pageable":{"key$":"pageable","properties":{"currentPage":{"type":"integer"},"elementsOnPage":{"type":"integer"},"nextPage":{"format":"uri","nullable":true,"type":"string"},"previousPage":{"format":"uri","nullable":true,"type":"string"},"totalElements":{"type":"integer"},"totalPages":{"type":"integer"}},"type":"object","x-ref":"#/components/schemas/Pageable"}},"x-ref":"#/components/schemas/FieldList"}}}}},"parameters":[{"name":"page","in":"query","description":"Used to navigate to a specific page","schema":{"type":"integer","default":0},"index$":0},{"name":"name","in":"query","description":"Returns a list of fields that have a similar name to the value","schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /field/{idOrName}":{"protocol":"http","operationId":"getField","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the field","key$":"id"},"field":{"type":"string","description":"Name of the field","key$":"field"},"image":{"type":"string","format":"uri","description":"Image URL for the field","key$":"image"},"description":{"type":"string","description":"Description of the field","key$":"description"}},"x-ref":"#/components/schemas/Field","index$":0}}}},"404":{"description":"Field not found"}},"parameters":[{"name":"idOrName","in":"path","required":true,"description":"Field unique ID or name","schema":{"oneOf":[{"type":"integer"},{"type":"string"}]},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let field_ref01_data = Object.values(setup.data.existing.field)[0] as any

    // LIST
    const field_ref01_ent = client.Field()
    const field_ref01_match: any = {}

    const field_ref01_list = (await field_ref01_ent.list(field_ref01_match)).map((e: any) => e.data())


    // LOAD
    const field_ref01_match_dt0: any = {}
    field_ref01_match_dt0.id = field_ref01_data.id
    const field_ref01_data_dt0 = (await field_ref01_ent.load(field_ref01_match_dt0)).data()
    assert(field_ref01_data_dt0.id === field_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/field/FieldTestData.json')

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
    ['field01','field02','field03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGIMON_TEST_FIELD_ENTID': idmap,
    'DIGIMON_TEST_LIVE': 'FALSE',
    'DIGIMON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DIGIMON_TEST_FIELD_ENTID']

  const live = 'TRUE' === env.DIGIMON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGIMON_TEST_FIELD_ENTID']
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
  
