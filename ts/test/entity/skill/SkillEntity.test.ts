

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


describe('SkillEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGIMON_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGIMON_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigimonSDK.test()
    const ent = testsdk.Skill()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigimonSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Skill().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGIMON_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'skill.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the skill","t":"`$STRING`","key$":"description","index$":0},"fields":{"a":true,"h":"Fields","n":"fields","r":false,"t":"`$ARRAY`","key$":"fields","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the skill","t":"`$INTEGER`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":3},"skill":{"a":true,"h":"Skill","n":"skill","r":false,"sh":"Name of the skill","t":"`$STRING`","key$":"skill","index$":4},"translation":{"a":true,"h":"Translation","n":"translation","r":false,"sh":"Translation of the skill name","t":"`$STRING`","key$":"translation","index$":5}},"id":{"field":"id","name":"id"},"name":"skill","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /skill/{idOrName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":1,"k":"param","n":"id","or":"idOrName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/skill/{idOrName}","q":{"exist":["id"]},"r":{"param":{"idOrName":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"skill"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /skill","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/skill","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"skill"}],"t":{"req":"`reqdata`","res":"`body.content`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"skill","name__orig":"skill","Name":"Skill","name_":"skill","name-":"skill","NAME":"SKILL","index$":4}, {"active":true,"entity":"skill","key$":"BasicSkillFlow","kind":"basic","name":"BasicSkillFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"skill_ref01","srcdatavar":"skill_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-skill_ref01"}}],"index$":0,"route":"GET /skill/{idOrName}","record":{}}]}, 'Skill', {"GET /skill/{idOrName}":{"protocol":"http","parameters":[{"name":"idOrName","in":"path","required":true,"description":"Skill unique ID or name","schema":{"oneOf":[{"type":"integer"},{"type":"string"}]},"example":1,"index$":0}]},"GET /skill":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Used to navigate to a specific page","schema":{"type":"integer","default":0},"index$":0},{"name":"name","in":"query","description":"Returns a list of skills that have a similar name to the value","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let skill_ref01_data = Object.values(setup.data.existing.skill)[0] as any

    // LOAD
    const skill_ref01_ent = client.Skill()
    const skill_ref01_match_dt0: any = {}
    skill_ref01_match_dt0.id = skill_ref01_data.id
    const skill_ref01_data_dt0 = (await skill_ref01_ent.load(skill_ref01_match_dt0)).data()
    assert(skill_ref01_data_dt0.id === skill_ref01_data.id)


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
      '../../../../.sdk/test/entity/skill/SkillTestData.json')

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
    ['skill01','skill02','skill03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGIMON_TEST_SKILL_ENTID': idmap,
    'DIGIMON_TEST_LIVE': 'FALSE',
    'DIGIMON_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DIGIMON_TEST_SKILL_ENTID']

  const live = 'TRUE' === env.DIGIMON_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGIMON_TEST_SKILL_ENTID']
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
  
