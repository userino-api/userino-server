import { expect } from 'chai'
import testUtil, { TestApp } from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/dashboard:/app/list [GET]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await testUtil.createApp()
  })

  it('it works', async () => {
    const { status, body } = await agent.get('/app/list')

    expect(status).to.equals(200)
    expect(body).to.have.length.gte(2)
  })
})
