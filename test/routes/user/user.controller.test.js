import assert from 'chai/register-assert'
import sinon from 'sinon'
import userModel from '../../../src/routes/user/user.model'
before(function(done) {
  const getUserStub = sinon.stub(userModel, 'getUserById')
  getUserStub.withArgs(1).returns([{
    name: 'bugall',
    password: 'a213df13df13w432dfvo134'
  }])
  getUserStub.withArgs(9999).returns([])
	done()
})

describe('Get user by id', () => {
  const UserController = require('../../../src/routes/user/user.controller').default
  const userController = new UserController()
  it('Shoud not success when id not a numeic type', async (done) => {
    const ctx = { params: { id: 1 }, body: {} }
    await userController.getUserById(ctx)
    console.log(ctx)
  }) 
})