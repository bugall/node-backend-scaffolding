import { assert } from 'chai'
import sinon from 'sinon'
import userModel from '../../../src/routes/user/user.model'
import userLib from '../../../src/routes/user/user.lib'

let getUserStub = null
let createUserStub = null
let getUserByUsernameStub = null

before( (done) => {
  // Stub getUserById
  getUserStub = sinon.stub(userModel, 'getUserById')
  getUserStub.withArgs(1).returns({
    name: 'bugall',
    password: 'bugall-password'
  })
  getUserStub.withArgs('string').returns({})

  // Stub createUser
  createUserStub = sinon.stub(userModel, 'createUser')
  createUserStub.withArgs('bugall-two', userLib.passwordEncrypt('bugall-two-password')).returns({ "insertId": 1 })
  createUserStub.withArgs('bugall', userLib.passwordEncrypt('password-password')).returns({})

  // Stub getUserInfoByUsername
  getUserByUsernameStub = sinon.stub(userModel, 'getUserInfoByUsername')
  getUserByUsernameStub.withArgs('bugall').returns([{ id: 1, name: 'bugall', password: 'bugall-password' }])
  getUserByUsernameStub.withArgs('bugall-two').returns([])
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

  it('Shoud success when username not exist', async () => {
    const ctx = { request: { body: { username: 'bugall-two', password: 'bugall-two-password' }} }
    await userController.createUser(ctx)
    assert.equal(ctx.body.code, 200)
  })
  it('Shoud not success when username has exist', async () => {
    const ctx = { request: { body: { username: 'bugall', password: 'bugall-password' }} }
    let errorMsg = null
    try {
      await userController.createUser(ctx)
    } catch(e) {
      errorMsg = e.message
    }
    assert.equal(errorMsg, 'USERNAME_HAS_USED')
  }) 
})

after( (done) => {
  createUserStub.restore()
  getUserStub.restore()
  getUserByUsernameStub.restore()
  done()
})