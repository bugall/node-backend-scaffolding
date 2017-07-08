import assert from 'chai/register-assert'
import sinon from 'sinon'
import User from '../../src/model/user'

describe('User Model', () => {
	describe('getUser', () => {
		it('Should print string', (done) => {
			const getUserStub = sinon.stub(User, 'getUser')
			getUserStub.withArgs(1).return(1);
			console.log(User.getUser)
			
			console.log('adsfadsf')
			done()
		})
	})
})
