import { expect } from 'chai'
import testUtil, { TestProject } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/dashboard:/project/:id/apps [GET]', () => {
  let project: TestProject

  before(async () => {
    project = await testUtil.createProject()
    await project.createApp()
    await project.createApp()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/project/${project.id}/apps`)

    expect(status).to.equals(200)
    expect(body).to.have.lengthOf(2)
  })
})
