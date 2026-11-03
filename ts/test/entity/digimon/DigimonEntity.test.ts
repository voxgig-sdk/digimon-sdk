

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DigimonSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('DigimonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGIMON_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGIMON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigimonSDK.test()
    const ent = testsdk.Digimon()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('digimon hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigimonSDK.test(offline).Digimon().stream('list')) { }
    }, /offline/)

    for await (const _item of DigimonSDK.test(offline).Digimon()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigimonSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Digimon().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigimonSDK.test().Digimon().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigimonSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Digimon().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Digimon().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigimonSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Digimon().list({"attribute":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGIMON_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'digimon.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attributes":{"a":true,"h":"Attributes","n":"attributes","r":false,"t":"`$ARRAY`","key$":"attributes","index$":0},"descriptions":{"a":true,"h":"Descriptions","n":"descriptions","r":false,"t":"`$ARRAY`","key$":"descriptions","index$":1},"fields":{"a":true,"h":"Fields","n":"fields","r":false,"t":"`$ARRAY`","key$":"fields","index$":2},"href":{"a":true,"fo":"uri","h":"Href","n":"href","r":false,"t":"`$STRING`","key$":"href","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the Digimon","t":"`$INTEGER`","key$":"id","index$":4},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"t":"`$STRING`","key$":"image","index$":5},"images":{"a":true,"h":"Images","n":"images","r":false,"t":"`$ARRAY`","key$":"images","index$":6},"levels":{"a":true,"h":"Levels","n":"levels","r":false,"t":"`$ARRAY`","key$":"levels","index$":7},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the Digimon","t":"`$STRING`","key$":"name","index$":8},"nextEvolutions":{"a":true,"h":"Next Evolutions","n":"nextEvolutions","r":false,"t":"`$ARRAY`","key$":"nextEvolutions","index$":9},"priorEvolutions":{"a":true,"h":"Prior Evolutions","n":"priorEvolutions","r":false,"t":"`$ARRAY`","key$":"priorEvolutions","index$":10},"releaseDate":{"a":true,"fo":"date","h":"Release Date","n":"releaseDate","r":false,"t":"`$STRING`","key$":"releaseDate","index$":11},"skills":{"a":true,"h":"Skills","n":"skills","r":false,"t":"`$ARRAY`","key$":"skills","index$":12},"types":{"a":true,"h":"Types","n":"types","r":false,"t":"`$ARRAY`","key$":"types","index$":13},"xAntibody":{"a":true,"h":"X Antibody","n":"xAntibody","r":false,"sh":"Indicates if the Digimon has X-Antibody","t":"`$BOOLEAN`","key$":"xAntibody","index$":14}},"id":{"field":"id","name":"id"},"name":"digimon","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /digimon","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"attribute","or":"attribute","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"exact","or":"exact","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"level","or":"level","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":20,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"x_antibody","or":"xAntibody","r":false,"t":"`$BOOLEAN`","index$":6}]},"k":"http","m":"GET","o":"/digimon","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"digimon"}],"t":{"req":"`reqdata`","res":"`body.content`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /digimon/{idOrName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":1,"k":"param","n":"id","or":"idOrName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/digimon/{idOrName}","q":{"exist":["id"]},"r":{"param":{"idOrName":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"digimon"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"digimon","name__orig":"digimon","Name":"Digimon","name_":"digimon","name-":"digimon","NAME":"DIGIMON","index$":1}, {"active":true,"entity":"digimon","key$":"BasicDigimonFlow","kind":"basic","name":"BasicDigimonFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"digimon_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"digimon_ref01","srcdatavar":"digimon_ref01_data","suffix":"_dt0"},"m":{"id":"digimon01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-digimon_ref01"}}],"index$":1,"route":"GET /digimon/{idOrName}","record":{}}]}, 'Digimon', {"GET /digimon":{"protocol":"http","parameters":[{"name":"name","in":"query","description":"Returns a list of digimons that have a similar name to the value","schema":{"type":"string"},"index$":0},{"name":"exact","in":"query","description":"Will search for the exact string passed in the 'name' parameter","schema":{"type":"boolean"},"index$":1},{"name":"attribute","in":"query","description":"Returns a list of digimons with the attribute equal to value (Case Insensitive)","schema":{"type":"string"},"index$":2},{"name":"xAntibody","in":"query","description":"Returns a list of digimons with the xAntibody equal to value","schema":{"type":"boolean"},"index$":3},{"name":"level","in":"query","description":"Returns a list of digimons with the level equal to value (Case Insensitive)","schema":{"type":"string"},"index$":4},{"name":"page","in":"query","description":"Used to navigate to a specific page","schema":{"type":"integer","default":0},"index$":5},{"name":"pageSize","in":"query","description":"Changes the quantity of rows returned for each page","schema":{"type":"integer","default":20},"index$":6}]},"GET /digimon/{idOrName}":{"protocol":"http","parameters":[{"name":"idOrName","in":"path","required":true,"description":"Digimon unique ID or name","schema":{"oneOf":[{"type":"integer"},{"type":"string"}]},"example":1,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let digimon_ref01_data = Object.values(setup.data.existing.digimon)[0] as any

    // LIST
    const digimon_ref01_ent = client.Digimon()
    const digimon_ref01_match: any = {}

    const digimon_ref01_list = (await digimon_ref01_ent.list(digimon_ref01_match)).map((e: any) => e.data())


    // LOAD
    const digimon_ref01_match_dt0: any = {}
    digimon_ref01_match_dt0.id = digimon_ref01_data.id
    const digimon_ref01_data_dt0 = (await digimon_ref01_ent.load(digimon_ref01_match_dt0)).data()
    assert(digimon_ref01_data_dt0.id === digimon_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/digimon/DigimonTestData.json')

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
    ['digimon01','digimon02','digimon03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGIMON_TEST_DIGIMON_ENTID': idmap,
    'DIGIMON_TEST_LIVE': 'FALSE',
    'DIGIMON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DIGIMON_TEST_DIGIMON_ENTID']

  const live = 'TRUE' === env.DIGIMON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGIMON_TEST_DIGIMON_ENTID']
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
  
