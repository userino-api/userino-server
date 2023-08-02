import { expect } from 'chai'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/me [GET]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('works', async () => {
    const { status, body } = await agent.get('/me').set('authorization', user.token)
    expect(status).to.equals(200)

    expect(body).to.deep.include({
      id: user.id,
      username: user.username,
      avatar_url: user.avatar_url,
      account_id: user.account_id,
    })
  })
})
