import { expect } from 'chai'
import { v4 } from 'uuid'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/me/username [POST]', () => {
  let user: TestUser
  let user2: TestUser

  before(async () => {
    user = await testUtil.createUser()
    user2 = await testUtil.createUser()
  })

  it('works', async () => {
    const { status, body } = await agent.post('/me/username').send({ username: v4() }).set('authorization', user.token)
    expect(status).to.equals(200)
    expect(body).to.deep.include({
      changed: 1,
    })
  })

  it('cannot set existing', async () => {
    await user2.setUsername('test')

    const { status, body } = await agent.post('/me/username').send({
      username: 'tEsT',
    }).set('authorization', user.token)

    expect(status).to.equals(409)
    expect(body).to.deep.include({
      errorCode: 'user/username-is-taken',
    })
  })
})
