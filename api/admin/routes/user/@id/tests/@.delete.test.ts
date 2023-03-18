import { expect } from 'chai'
import testUtil, { TestAdmin, TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/user/:id [DELETE]', () => {
  let user: TestUser
  let admin: TestAdmin

  before(async () => {
    user = await testUtil.createUser()
    admin = await testUtil.createAdmin()
  })

  it('it works', async () => {
    const { status, body } = await agent.delete(`/user/${user.user_id}`).set('authorization', admin.authorization)

    expect(status).to.equals(200)

    const appUser = await user.fetch()
    expect(appUser).is.undefined
  })
})
