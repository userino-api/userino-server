import { expect } from 'chai'
import moment from 'moment/moment'
import redisClient from '@libs/redis'
import emailActionModel from '@models/emailActionModel'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/email/verify [POST]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
    await redisClient.flushDb()
  })

  it('email account is not exists', async () => {
    const { status, body } = await agent.post('/email/verify')
    expect(status).to.equals(400)
  })

  it('it works', async () => {
    await user.createLocalAuth()
    const code = await emailActionModel.create({
      ...user,
      action: 'email/verify',
      expired_at: moment().add(1, 'hour').toISOString(),
    })
    const { status, body } = await agent.post('/email/verify').send({
      code,
    })

    expect(status).to.equals(200)
    expect(body).to.deep.include({
      is_verified: true,
    })
  })
})
