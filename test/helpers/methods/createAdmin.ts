import createLicenceAdmin, { TestAdmin as TestLicenceAdmin } from '@octoguild-licence/client/test/methods/createAdmin'
import createApp, { TestApp } from './createApp'
import { TestProject } from './createProject'

/**
 *  not finished
 * */
export class TestAdmin extends TestLicenceAdmin {
  app: TestApp

  project: TestProject

  constructor(params: {
admin: TestLicenceAdmin
    app: TestApp
}) {
    super({
      client_id: params.admin.client_id,
      client_secret: params.admin.client_secret,
    })
    this.app = params.app
    this.project = params.app.project
  }
}

/**
 *  This admin is not real admin user, it is like client credential
 * */
export async function createAdmin(params?: { }): Promise<TestAdmin> {
  let {
  } = params || {}

  // const admin_id = uuid() // not sure if it will work

  const licenceAdmin = createLicenceAdmin()
  const app = await createApp()
  // await projectAdminModel.create({ admin_id, project_id: app.project.id })

  const testUser = new TestAdmin({
    admin: licenceAdmin, app,
  })

  return testUser
}

export default createAdmin
