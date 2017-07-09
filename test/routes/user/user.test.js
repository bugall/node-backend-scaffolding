import assert from 'chai/register-assert'
import sinon from 'sinon'
import userController from '../../../routes/user/user.controller'

describe('User Model', () => {
	describe('Get user by user id', () => {

	})
	describe('Get user by user id when user id is too long', () => {

	})
	describe('Get user by user id not number', () => {
		it('Should print string', (done) => {
			const getUserStub = sinon.stub(User, 'getUser')
			getUserStub.withArgs(1).return(1);
			done()
		})
	})

	describe('Create user when username has exist', () => {
	})

	describe('Create user when username or password too long', () => {
	})

	describe('Create user when username or password too short', () => {
	})

	describe('Create user when username or password format error', () => {
	})

	describe('Check if the user exists', () => {
	})
})
