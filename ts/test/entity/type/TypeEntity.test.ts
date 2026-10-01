

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


describe('TypeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGIMON_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGIMON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigimonSDK.test()
    const ent = testsdk.Type()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGIMON_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'type.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"href":{"a":true,"fo":"uri","h":"Href","n":"href","r":false,"t":"`$STRING`","key$":"href","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the type","t":"`$INTEGER`","key$":"id","index$":1},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Name of the type","t":"`$STRING`","key$":"type","index$":2}},"id":{"field":"id","name":"id"},"name":"type","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /type","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/type","q":{"exist":["name","page"]},"r":{},"s":[{"lit":"type"}],"t":{"req":"`reqdata`","res":"`body.content`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /type/{idOrName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"idOrName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/type/{idOrName}","q":{"exist":["id"]},"r":{"param":{"idOrName":"id"}},"s":[{"lit":"type"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"type","name__orig":"type","Name":"Type","name_":"type","name-":"type","NAME":"TYPE","index$":5}, {"active":true,"entity":"type","key$":"BasicTypeFlow","kind":"basic","name":"BasicTypeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"type_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"type_ref01","srcdatavar":"type_ref01_data","suffix":"_dt0"},"m":{"id":"type01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-type_ref01"}}],"index$":1}]}, 'Type', {"GET /type":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Used to navigate to a specific page","schema":{"type":"integer","default":0},"index$":0},{"name":"name","in":"query","description":"Returns a list of types that have a similar name to the value","schema":{"type":"string"},"index$":1}]},"GET /type/{idOrName}":{"protocol":"http","parameters":[{"name":"idOrName","in":"path","required":true,"description":"Type unique ID or name","schema":{"oneOf":[{"type":"integer"},{"type":"string"}]},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let type_ref01_data = Object.values(setup.data.existing.type)[0] as any

    // LIST
    const type_ref01_ent = client.Type()
    const type_ref01_match: any = {}

    const type_ref01_list = (await type_ref01_ent.list(type_ref01_match)).map((e: any) => e.data())


    // LOAD
    const type_ref01_match_dt0: any = {}
    type_ref01_match_dt0.id = type_ref01_data.id
    const type_ref01_data_dt0 = (await type_ref01_ent.load(type_ref01_match_dt0)).data()
    assert(type_ref01_data_dt0.id === type_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/type/TypeTestData.json')

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
    ['type01','type02','type03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGIMON_TEST_TYPE_ENTID': idmap,
    'DIGIMON_TEST_LIVE': 'FALSE',
    'DIGIMON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DIGIMON_TEST_TYPE_ENTID']

  const live = 'TRUE' === env.DIGIMON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGIMON_TEST_TYPE_ENTID']
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
  
