require('dotenv').config({ path: './.env.local' })
require('dotenv').config()

// require('ts-node/register')
require('@babel/register')({
  extensions: ['.js', '.ts'],
  babelrcRoots: [
    '.',
    './packages/*',
  ],
})
