import { expect } from 'chai'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/user/:id/email [GET]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/user/${user.user_id}/email`)

    expect(status).to.equals(200)
    expect(body).to.deep.include({
      email: user.email,
    })
  })
})
