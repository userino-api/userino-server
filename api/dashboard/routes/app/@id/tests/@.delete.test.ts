import { expect } from 'chai'
import testUtil, { TestApp } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/app/:id [DELETE]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
  })

  it('it works', async () => {
    const { status, body } = await agent.delete(`/app/${app.id}`)

    expect(status).to.equals(200)

    const appAfter = await app.fetch()
    expect(appAfter).is.undefined
  })
})
