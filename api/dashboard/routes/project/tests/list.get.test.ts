import { expect } from 'chai'
import testUtil, { TestProject } from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/dashboard:/project/list [GET]', () => {
  let project: TestProject

  before(async () => {
    project = await testUtil.createProject()
    await testUtil.createProject()
  })

  it('it works', async () => {
    const { status, body } = await agent.get('/project/list')

    expect(status).to.equals(200)
    expect(body).to.have.length.gte(2)
  })
})
