'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

before(function(done) {
  done()
})

describe('Routes Test', function() {
  require('./routes/user/user.test')
})

after(function(done) {
  done()
})
