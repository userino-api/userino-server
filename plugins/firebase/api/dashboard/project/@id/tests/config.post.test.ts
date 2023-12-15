import { expect } from 'chai'
import agent from '../../../../../../../api/dashboard/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'

describe('/dashboard:/project/:id/config [POST]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
  })

  it('works', async () => {
    const { status, body } = await agent.post(`/firebase/project/${app.project.id}/config`).send({
      fileRaw: JSON.stringify({ type: 'service_account' }),
    })
    expect(status).to.eq(200)
  })

  it('invalid config sent', async () => {
    const { status } = await agent.post(`/firebase/project/${app.project.id}/config`).send({
      fileRaw: JSON.stringify({ abc: 123 }),
    })
    expect(status).to.eq(400)
  })
})
