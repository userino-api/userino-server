import { expect } from 'chai'
import { TestUser } from '../../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/user:/user/:id [GET]', () => {
  let user: TestUser
  let user2: TestUser

  before(async () => {
    user = await testUtil.createUser()
    user2 = await testUtil.createUser()
  })

  it('works', async () => {
    const { status, body } = await agent.get(`/user/${user2.user_id}`).set('authorization', user.token)
    expect(status).to.equals(200)

    expect(body).to.deep.include({
      id: user2.id,
      username: user2.username,
      avatar_url: user2.avatar_url,
      account_id: user2.account_id,
    })
  })
})
