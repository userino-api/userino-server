import bcrypt from 'bcrypt'
import { expect } from 'chai'
import accountLocalModel from '@models/accountLocalModel'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/user:/local/password/change [POST]', () => {
  let user: TestUser
  let password = '111111'

  before(async () => {
    user = await testUtil.createUser()
  })

  it('validation error - 400', async () => {
    const { status, body } = await agent.post('/local/password/change')
      .send({ password: '111111' })
      .set('authorization', user.token)

    expect(status).to.equals(400)
  })

  it('invalid password auth - 403', async () => {
    const { status, body } = await agent.post('/local/password/change')
      .send({ password: '1xxxxxx', password_new: 'xxxxxxx' })
      .set('authorization', user.token)

    expect(status).to.equals(403)
  })

  it('works', async () => {
    const password_new = 'xxxxxxx'

    const localAuth = await user.createLocalAuth({ password })
    const { status, body } = await agent.post('/local/password/change')
      .send({ password, password_new })
      .set('authorization', user.token)

    expect(status).to.equals(200)

    const account = await accountLocalModel.getByAccount({ account_id: user.account_id })
    if (!account) throw new Error('Account not found')
    expect(bcrypt.compareSync(password_new, account.password)).to.eq(true)
    expect(bcrypt.compareSync(password, account.password)).to.eq(false)
  })
})
