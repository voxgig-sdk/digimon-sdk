
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DigimonSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await DigimonSDK.test()
    equal(null !== testsdk, true)
  })

})
