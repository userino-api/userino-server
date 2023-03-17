import { expect } from 'chai'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/user/:id [GET]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/user/${user.user_id}`)

    expect(status).to.equals(200)
    expect(body).to.deep.include({
      id: user.user_id,
      account_id: user.account_id,
    })
    expect(body.name).is.a('string')
  })
})
