'use strict'
require('babel-core/register')({
	presets: ['latest'],
})
require('babel-polyfill')

before(function(done) {
	console.log('ready to test')
	done()
})

describe('Routes Test', function() {
	require('./routes/user/user.test')
})

after(function(done) {
	console.log('test finish')
	done()
})
