import { v4 as uuid } from 'uuid'
import appAuthList from '@models/appAuthModel'
import appAuthModel from '@models/appAuthModel'
import appsModel from '@models/appsModel'
import configAuthController from '../../../controllers/configAuthController'

export class TestApp {
  id: string

  app_id: string

  name: string

  constructor(params: {
    app_id: string
    name: string
  }) {
    this.app_id = params.app_id
    this.id = params.app_id
    this.name = params.name
  }

  async fetch() {
    const user = await appsModel.get(this.id)

    return user
  }

  async getAuth(key: string) {
    return appAuthList.get({ key, app_id: this.app_id })
  }

  enableAuth(key: string) {
    return configAuthController.enableAuth({ key, app_id: this.app_id })
  }

  disableAuth(key: string) {
    return configAuthController.disableAuth({ key, app_id: this.app_id })
  }

  createAuthProvider() {
    return appAuthModel.create({
      app_id: this.app_id,
      key: uuid(),
    })
  }
}

export async function createApp(params?: { }): Promise<TestApp> {
  let name = uuid()
  const app_id: string = await appsModel.create({
    name,
  })

  const testApp = new TestApp({ app_id, name })
  return testApp
}

export default createApp
