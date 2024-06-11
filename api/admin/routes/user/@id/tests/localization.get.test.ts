import { expect } from 'chai'
import testUtil, { TestAdmin, TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/user/:id/localization [GET]', () => {
  let user: TestUser
  let admin: TestAdmin

  before(async () => {
    user = await testUtil.createUser()
    admin = await testUtil.createAdmin()
    await user.setLocalization()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/user/${user.id}/localization`).set('authorization', admin.authorization)

    expect(status).to.equals(200)
    // expect(body).to.deep.include({
    //   email: user.email.toLowerCase(),
    // })
  })
})
