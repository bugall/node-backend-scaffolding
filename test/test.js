'use strict'
require('babel-core/register')({
	presets: ['latest'],
})
require('babel-polyfill')

before(function(done) {
	console.log('ready to test')
	done()
})

describe('Model Test', function() {
	require('./models/user.test')
})

after(function(done) {
	console.log('test finish')
	done()
})
