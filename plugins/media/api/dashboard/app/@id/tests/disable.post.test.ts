import { expect } from 'chai'
import agent from '../../../../../../../api/dashboard/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'

describe('/dashboard:/app/:id/disable [POST]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await app.enableAuth('firebase')
  })

  it('works', async () => {
    const { status, body } = await agent.post(`/firebase/app/${app.id}/disable`)
    expect(status).to.eq(200)

    const config = await app.getAuth('firebase')
    expect(config).to.have.property('is_enabled', false)
  })
})
