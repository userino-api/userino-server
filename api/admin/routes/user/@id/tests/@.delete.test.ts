import { expect } from 'chai'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/user/:id [DELETE]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('it works', async () => {
    const { status, body } = await agent.delete(`/user/${user.user_id}`)

    expect(status).to.equals(200)

    const appUser = await user.fetch()
    expect(appUser).is.undefined
  })
})
