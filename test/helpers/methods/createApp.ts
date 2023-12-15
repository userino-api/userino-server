import { v4 as uuid } from 'uuid'
import appsModel from '@models/appsModel'
import createProject, { TestProject } from './createProject'

export class TestApp {
  id: string

  app_id: string

  project: TestProject

  name: string

  constructor(params: {
    project: TestProject
    app_id: string
    name: string
  }) {
    this.app_id = params.app_id
    this.id = params.app_id
    this.project = params.project
    this.name = params.name
  }

  async fetch() {
    const user = await appsModel.get(this.id)

    return user
  }
}

export async function createApp(params?: { project: TestProject }): Promise<TestApp> {
  let { project } = params || {}
  if (!project) {
    project = await createProject()
  }

  let name = uuid()
  const app_id: string = await appsModel.create({
    name,
    project_id: project.id,
  })

  const testApp = new TestApp({ app_id, name, project })
  return testApp
}

export default createApp
