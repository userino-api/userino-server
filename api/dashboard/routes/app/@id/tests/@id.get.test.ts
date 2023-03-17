import { expect } from 'chai'
import testUtil, { TestApp } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/dashboard:/app/:id [GET]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/app/${app.id}`)

    expect(status).to.equals(200)
    expect(body).to.deep.include({
      id: app.id,
      name: app.name,
    })
  })
})
