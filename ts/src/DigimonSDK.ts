// Digimon Ts SDK

import { AttributeEntity } from './entity/AttributeEntity'
import { DigimonEntity } from './entity/DigimonEntity'
import { FieldEntity } from './entity/FieldEntity'
import { LevelEntity } from './entity/LevelEntity'
import { SkillEntity } from './entity/SkillEntity'
import { TypeEntity } from './entity/TypeEntity'

export type * from './DigimonTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { DigimonEntityBase } from './DigimonEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class DigimonSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _attribute?: AttributeEntity

  // Idiomatic facade: `client.attribute.list()` / `client.attribute.load({ id })`.
  get attribute(): AttributeEntity {
    return (this._attribute ??= new AttributeEntity(this, undefined))
  }

  /** @deprecated Use `client.attribute` instead. */
  Attribute(data?: any) {
    const self = this
    return new AttributeEntity(self,data)
  }


  _digimon?: DigimonEntity

  // Idiomatic facade: `client.digimon.list()` / `client.digimon.load({ id })`.
  get digimon(): DigimonEntity {
    return (this._digimon ??= new DigimonEntity(this, undefined))
  }

  /** @deprecated Use `client.digimon` instead. */
  Digimon(data?: any) {
    const self = this
    return new DigimonEntity(self,data)
  }


  _field?: FieldEntity

  // Idiomatic facade: `client.field.list()` / `client.field.load({ id })`.
  get field(): FieldEntity {
    return (this._field ??= new FieldEntity(this, undefined))
  }

  /** @deprecated Use `client.field` instead. */
  Field(data?: any) {
    const self = this
    return new FieldEntity(self,data)
  }


  _level?: LevelEntity

  // Idiomatic facade: `client.level.list()` / `client.level.load({ id })`.
  get level(): LevelEntity {
    return (this._level ??= new LevelEntity(this, undefined))
  }

  /** @deprecated Use `client.level` instead. */
  Level(data?: any) {
    const self = this
    return new LevelEntity(self,data)
  }


  _skill?: SkillEntity

  // Idiomatic facade: `client.skill.list()` / `client.skill.load({ id })`.
  get skill(): SkillEntity {
    return (this._skill ??= new SkillEntity(this, undefined))
  }

  /** @deprecated Use `client.skill` instead. */
  Skill(data?: any) {
    const self = this
    return new SkillEntity(self,data)
  }


  _type?: TypeEntity

  // Idiomatic facade: `client.type.list()` / `client.type.load({ id })`.
  get type(): TypeEntity {
    return (this._type ??= new TypeEntity(this, undefined))
  }

  /** @deprecated Use `client.type` instead. */
  Type(data?: any) {
    const self = this
    return new TypeEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new DigimonSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return DigimonSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Digimon' }
  }

  toString() {
    return 'Digimon ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = DigimonSDK


export {
  stdutil,

  BaseFeature,
  DigimonEntityBase,

  DigimonSDK,
  SDK,
}


