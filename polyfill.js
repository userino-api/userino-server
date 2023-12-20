/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config({ path: './.env.local' })
require('dotenv').config()

// require('ts-node/register') // sometimes needs when some package is linked
require('@babel/register')({
  extensions: ['.js', '.ts'],
  babelrcRoots: [
    '.',
    './packages/*',
  ],
})
