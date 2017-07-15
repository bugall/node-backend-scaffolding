import { assert } from 'chai'
import sinon from 'sinon'
import userLib from '../../../src/routes/user/user.lib'

describe('User lib', () => {
  // const UserLib = require('../../../src/routes/user/user.lib').default
  // const defaultMd5String = 'e10adc3949ba59abbe56e057f20f883e' // 123456

  // it('Shoud success when result equal default md5 string', async () => {
  //   const encrtpyedPassword = UserLib.passwordEncrypt('123456')
  //   assert.equal(encrtpyedPassword, defaultMd5String)
  // })
  const obj = {
    say: function(name) {
      console.log(name)
    }
  }
  const spy = sinon.spy(obj, 'say')
  console.log('created spy')
  obj.say('fuck')
  console.log('celled fuck')
})