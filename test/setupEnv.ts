process.env.NODE_ENV = 'test'

require('./stubs/kafkaStub')
require('@octoguild-licence/client/test/stub')

// plugins
require('../plugins/firebase/tests/setup')
