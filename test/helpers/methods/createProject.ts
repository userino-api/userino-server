import { v4 as uuid } from 'uuid'
import appAuthModel from '@models/appAuthModel'
import projectModel from '@models/projectModel'
import configAuthController from '../../../controllers/configAuthController'
import createApp from './createApp'

export class TestProject {
  id: string

  project_Id: string

  name: string

  constructor(params: {
    project_Id: string
    name: string
  }) {
    this.project_Id = params.project_Id
    this.id = params.project_Id
    this.name = params.name
  }

  async fetch() {
    const user = await projectModel.get(this.id)

    return user
  }

  async createApp() {
    return createApp({ project: this })
  }

  async getAuth(key: string) {
    return appAuthModel.get({ key, project_id: this.project_Id })
  }

  enableAuth(key: string) {
    return configAuthController.enableAuth({ key, project_id: this.project_Id })
  }

  disableAuth(key: string) {
    return configAuthController.disableAuth({ key, project_id: this.project_Id })
  }

  createAuthProvider() {
    return appAuthModel.create({
      project_id: this.project_Id,
      key: uuid(),
    })
  }
}

export async function createProject(params?: { }): Promise<TestProject> {
  let name = uuid()
  const project_Id: string = await projectModel.create({
    name,
  })

  const testProject = new TestProject({ project_Id, name })
  return testProject
}

export default createProject
