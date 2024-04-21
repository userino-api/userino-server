import { expect } from 'chai'
import testUtil, { TestProject } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/dashboard:/project/:id [GET]', () => {
  let project: TestProject

  before(async () => {
    project = await testUtil.createProject()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/project/${project.id}`)

    expect(status).to.equals(200)
    expect(body).to.deep.include({
      id: project.id,
      name: project.name,
    })
  })
})
