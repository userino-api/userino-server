import { expect } from 'chai'
import agent from '../../../../../../../api/dashboard/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'

describe('/dashboard:/project/:id/disable [POST]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await app.project.enableAuth('firebase')
  })

  it('works', async () => {
    const { status, body } = await agent.post(`/firebase/project/${app.project.id}/disable`)
    expect(status).to.eq(200)

    const config = await app.project.getAuth('firebase')
    expect(config).to.have.property('is_enabled', false)
  })
})
