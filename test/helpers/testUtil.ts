import createAdmin, { TestAdmin } from '@octoguild-licence/client/test/methods/createAdmin'
import createApp from './methods/createApp'
import createUser from './methods/createUser'

export { TestAdmin }
export * from './methods/createUser'
export * from './methods/createApp'

async function wait(ms: number) {
  return new Promise((go, stop) => {
    setTimeout(go, ms)
  })
}

export default {
  wait,
  createUser,
  createAdmin,
  createApp,
}
