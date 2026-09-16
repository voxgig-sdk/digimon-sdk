

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"attribute","req":false,"short":"Name of the attribute","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Description of the attribute","type":"`$STRING`","index$":1},{"active":true,"format":"uri","name":"href","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the attribute","type":"`$INTEGER`","index$":3}],"id":{"field":"id","name":"id"},"name":"attribute","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"name","orig":"name","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":0,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /attribute","json":"{\"operationId\":\"getAttributeList\",\"parameters\":[{\"description\":\"Used to navigate to a specific page\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Returns a list of attributes that have a similar name to the value\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"content\":{\"items\":{\"properties\":{\"attribute\":{\"type\":\"string\"},\"href\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"pageable\":{\"properties\":{\"currentPage\":{\"type\":\"integer\"},\"elementsOnPage\":{\"type\":\"integer\"},\"nextPage\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"previousPage\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"totalElements\":{\"type\":\"integer\"},\"totalPages\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/attribute","segments":[{"lit":"attribute"}],"select":{"exist":["name","page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id_or_name","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /attribute/{idOrName}","json":"{\"operationId\":\"getAttribute\",\"parameters\":[{\"description\":\"Attribute unique ID or name\",\"in\":\"path\",\"name\":\"idOrName\",\"required\":true,\"schema\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"attribute\":{\"description\":\"Name of the attribute\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the attribute\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the attribute\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Attribute not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/attribute/{idOrName}","rename":{"param":{"idOrName":"id"}},"segments":[{"lit":"attribute"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"attribute","name__orig":"attribute","Name":"Attribute","name_":"attribute","name-":"attribute","NAME":"ATTRIBUTE","index$":0}, {"active":true,"entity":"attribute","key$":"BasicAttributeFlow","kind":"basic","name":"BasicAttributeFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"attribute_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"attribute_ref01","srcdatavar":"attribute_ref01_data","suffix":"_dt0"},"match":{"id":"attribute01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-attribute_ref01"}}],"index$":1}]}, 'Attribute')
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
  
