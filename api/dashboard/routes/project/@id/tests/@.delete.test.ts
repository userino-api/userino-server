import { expect } from 'chai'
import testUtil, { TestProject, TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/project/:id [DELETE]', () => {
  let project: TestProject

  before(async () => {
    project = await testUtil.createProject()
  })

  it('it works', async () => {
    const { status, body } = await agent.delete(`/project/${project.id}`)

    expect(status).to.equals(200)

    const appAfter = await project.fetch()
    expect(appAfter).is.undefined
  })
})
