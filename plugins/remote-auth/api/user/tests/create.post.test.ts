import { expect } from 'chai'
import agent from '../../../../../api/user/tests/testServer'

describe('/remote/create [POST]', () => {
  before(async () => {
    // const defaultApp = await appsModel.getPrimaryApp()
  })

  it('login first try', async () => {
    const { status, body } = await agent.post('/remote/create')
    expect(status).to.equals(200)

    expect(body.id).is.an('string')
  })
})
