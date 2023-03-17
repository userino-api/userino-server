import { expect } from 'chai'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/email/send [POST]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('email account is not exists', async () => {
    const { status, body } = await agent.post('/email/send').send({
      token: user.token,
    }).set('authorization', user.token)

    expect(status).to.equals(403)
  })

  it('it works', async () => {
    await user.createLocalAuth()
    const { status, body } = await agent.post('/email/send').send({
      token: user.token,
    }).set('authorization', user.token)

    expect(status).to.equals(200)
    expect(body).to.deep.include({
      is_verified: false,
    })
  })
})
