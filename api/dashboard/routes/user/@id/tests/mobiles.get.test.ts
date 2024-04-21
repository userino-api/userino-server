import { expect } from 'chai'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/user/:id/mobiles [GET]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
    await user.createDevice()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/user/${user.user_id}/mobiles`)

    expect(status).to.equals(200)
    expect(body).to.have.lengthOf(1)
  })
})
