

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


describe('LevelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGIMON_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGIMON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigimonSDK.test()
    const ent = testsdk.Level()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGIMON_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'level.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uri","name":"href","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the level","type":"`$INTEGER`","index$":1},{"active":true,"name":"level","req":false,"short":"Name of the level","type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"level","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"name","orig":"name","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":0,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /level","json":"{\"operationId\":\"getLevelList\",\"parameters\":[{\"description\":\"Used to navigate to a specific page\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Returns a list of levels that have a similar name to the value\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"content\":{\"items\":{\"properties\":{\"href\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"level\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"pageable\":{\"properties\":{\"currentPage\":{\"type\":\"integer\"},\"elementsOnPage\":{\"type\":\"integer\"},\"nextPage\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"previousPage\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"totalElements\":{\"type\":\"integer\"},\"totalPages\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/level","segments":[{"lit":"level"}],"select":{"exist":["name","page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id_or_name","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /level/{idOrName}","json":"{\"operationId\":\"getLevel\",\"parameters\":[{\"description\":\"Level unique ID or name\",\"in\":\"path\",\"name\":\"idOrName\",\"required\":true,\"schema\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the level\",\"type\":\"integer\"},\"level\":{\"description\":\"Name of the level\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Level not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/level/{idOrName}","rename":{"param":{"idOrName":"id"}},"segments":[{"lit":"level"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"level","name__orig":"level","Name":"Level","name_":"level","name-":"level","NAME":"LEVEL","index$":3}, {"active":true,"entity":"level","key$":"BasicLevelFlow","kind":"basic","name":"BasicLevelFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"level_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"level_ref01","srcdatavar":"level_ref01_data","suffix":"_dt0"},"match":{"id":"level01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-level_ref01"}}],"index$":1}]}, 'Level')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let level_ref01_data = Object.values(setup.data.existing.level)[0] as any

    // LIST
    const level_ref01_ent = client.Level()
    const level_ref01_match: any = {}

    const level_ref01_list = (await level_ref01_ent.list(level_ref01_match)).map((e: any) => e.data())


    // LOAD
    const level_ref01_match_dt0: any = {}
    level_ref01_match_dt0.id = level_ref01_data.id
    const level_ref01_data_dt0 = (await level_ref01_ent.load(level_ref01_match_dt0)).data()
    assert(level_ref01_data_dt0.id === level_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/level/LevelTestData.json')

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
    ['level01','level02','level03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGIMON_TEST_LEVEL_ENTID': idmap,
    'DIGIMON_TEST_LIVE': 'FALSE',
    'DIGIMON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DIGIMON_TEST_LEVEL_ENTID']

  const live = 'TRUE' === env.DIGIMON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGIMON_TEST_LEVEL_ENTID']
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
  
