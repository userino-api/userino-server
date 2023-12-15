import { expect } from 'chai'
import { v4 } from 'uuid'
import agent from '../../../../../../../api/dashboard/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'

describe('/dashboard:/project/:id/config [POST]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
  })

  it('works', async () => {
    const { status, body } = await agent.post(`/media/project/${app.project.id}/config`).send({
      client_id: v4(),
      client_secret: 'secret',
    })
    expect(status).to.eq(200)
  })

  it('invalid config sent', async () => {
    const { status } = await agent.post(`/media/project/${app.project.id}/config`).send({
      client_id: v4(),
    })
    expect(status).to.eq(400)
  })
})
