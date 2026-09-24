
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DigimonSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DigimonSDK.test()
    equal(testsdk instanceof DigimonSDK, true,
      'DigimonSDK.test() must return a client synchronously')
  })

})
