import { expect } from 'chai'
import { v4 } from 'uuid'
import agent from '../../../../../../../api/dashboard/tests/testServer'
import testUtil, { TestProject } from '../../../../../../../test/helpers/testUtil'
import firebaseAppConfigModel from '../../../../../models/mediaAppConfigModel'

describe('/dashboard:/project/:id/config [GET]', () => {
  let project: TestProject

  before(async () => {
    project = await testUtil.createProject()
    await firebaseAppConfigModel.create({ project_id: project.id, client_id: v4(), client_secret: 'yyy' })
  })

  it('works', async () => {
    const { status, body } = await agent.get(`/media/project/${project.id}/config`)
    expect(status).to.eq(200)

    expect(body).is.not.empty
  })
})
