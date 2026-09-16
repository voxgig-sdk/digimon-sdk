

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Description of the field","type":"`$STRING`","index$":0},{"active":true,"name":"field","req":false,"short":"Name of the field","type":"`$STRING`","index$":1},{"active":true,"format":"uri","name":"href","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the field","type":"`$INTEGER`","index$":3},{"active":true,"format":"uri","name":"image","req":false,"short":"Image URL for the field","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"field","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"name","orig":"name","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":0,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /field","json":"{\"operationId\":\"getFieldList\",\"parameters\":[{\"description\":\"Used to navigate to a specific page\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Returns a list of fields that have a similar name to the value\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"content\":{\"items\":{\"properties\":{\"field\":{\"type\":\"string\"},\"href\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"image\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"pageable\":{\"properties\":{\"currentPage\":{\"type\":\"integer\"},\"elementsOnPage\":{\"type\":\"integer\"},\"nextPage\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"previousPage\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"totalElements\":{\"type\":\"integer\"},\"totalPages\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/field","segments":[{"lit":"field"}],"select":{"exist":["name","page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id_or_name","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /field/{idOrName}","json":"{\"operationId\":\"getField\",\"parameters\":[{\"description\":\"Field unique ID or name\",\"in\":\"path\",\"name\":\"idOrName\",\"required\":true,\"schema\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Description of the field\",\"type\":\"string\"},\"field\":{\"description\":\"Name of the field\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the field\",\"type\":\"integer\"},\"image\":{\"description\":\"Image URL for the field\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Field not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/field/{idOrName}","rename":{"param":{"idOrName":"id"}},"segments":[{"lit":"field"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"field","name__orig":"field","Name":"Field","name_":"field","name-":"field","NAME":"FIELD","index$":2}, {"active":true,"entity":"field","key$":"BasicFieldFlow","kind":"basic","name":"BasicFieldFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"field_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"field_ref01","srcdatavar":"field_ref01_data","suffix":"_dt0"},"match":{"id":"field01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-field_ref01"}}],"index$":1}]}, 'Field')
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
  
