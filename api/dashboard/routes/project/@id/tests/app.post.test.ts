import { expect } from 'chai'
import { v4 } from 'uuid'
import { TestProject } from '../../../../../../test/helpers/methods/createProject'
import testUtil from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/dashboard:/project/:id/app [POST]', () => {
  let project: TestProject

  before(async () => {
    project = await testUtil.createProject()
  })

  it('it works', async () => {
    const name = v4()
    const { status, body } = await agent.post(`/project/${project.id}/app`).send({
      name,
    })

    expect(status).to.equals(200)
    expect(body).to.deep.include({
      name,
    })
  })
})
