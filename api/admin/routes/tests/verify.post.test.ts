import { expect } from 'chai'
import { TestUser } from '../../../../test/helpers/methods/createUser'
import testUtil, { TestAdmin } from '../../../../test/helpers/testUtil'
import agent from '../../tests/testServer'

describe('/admin:/verify [POST]', () => {
  let user: TestUser
  let admin: TestAdmin

  before(async () => {
    user = await testUtil.createUser()
    admin = await testUtil.createAdmin()
  })

  it('it works', async () => {
    const { status, body } = await agent.post('/verify').send({
      token: user.token,
    }).set('authorization', admin.authorization)

    expect(status).to.equals(200)
    // expect(body).to.deep.include({})
  })
})
