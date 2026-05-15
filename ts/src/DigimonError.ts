
import { Context } from './Context'


class DigimonError extends Error {

  isDigimonError = true

  sdk = 'Digimon'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DigimonError
}

