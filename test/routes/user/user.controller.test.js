import { assert } from 'chai'
import sinon from 'sinon'
import userModel from '../../../src/routes/user/user.model'
before(function(done) {
  // Stub getUserById
  const getUserStub = sinon.stub(userModel, 'getUserById')
  getUserStub.withArgs(1).returns({
    name: 'bugall',
    password: 'bugall-password'
  })
  getUserStub.withArgs('string').returns({})

  // Stub createUser
  const createUserStub = sinon.stub(userModel, 'createUser')
  createUserStub.withArgs('bugall-two', 'bugall-two-password').returns({ userId: 1 })
  createUserStub.withArgs('bugall', 'password-password').returns({})

  // Stub getUserInfoByUsername
  const getUserByUsernameStub = sinon.stub(userModel, 'getUserInfoByUsername')
  getUserByUsernameStub.withArgs('bugall').returns([{ id: 1, name: 'bugall', password: 'bugall-password' }])
  getUserByUsernameStub.withArgs('bugall-two').returns([{}])
	done()
})

describe('Get user by id', () => {
  const UserController = require('../../../src/routes/user/user.controller').default
  const userController = new UserController()

  it('Shoud not success when id not a numeic type', async () => {
    const ctx = { params: { id: 'string' }, body: {} }
    let errorMsg = null
    try {
      await userController.getUserById(ctx)
    } catch(e) {
      errorMsg = e.message
    }
    assert.equal(errorMsg, 'FORMAT_ERROR')
  })
  it('Shoud success when id is a numeic type', async () => {
    const ctx = { params: { id: 1 }, body: {} }
    await userController.getUserById(ctx)
    assert.equal(ctx.body.code, 200)
  }) 
})

describe('Create user', () => {
  const UserController = require('../../../src/routes/user/user.controller').default
  const userController = new UserController()

  it('Shoud not success when id not a numeic type', async () => {
    const ctx = { params: { id: 'string' }, body: {} }
    let errorMsg = null
    try {
      await userController.getUserById(ctx)
    } catch(e) {
      errorMsg = e.message
    }
    assert.equal(errorMsg, 'FORMAT_ERROR')
  })
  it('Shoud success when id is a numeic type', async () => {
    const ctx = { params: { id: 1 }, body: {} }
    await userController.getUserById(ctx)
    assert.equal(ctx.body.code, 200)
  }) 
})
