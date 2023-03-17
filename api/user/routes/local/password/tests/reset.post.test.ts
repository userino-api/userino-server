import bcrypt from 'bcrypt'
import { expect } from 'chai'
import generator from 'generate-password'
import sinon from 'sinon'
import accountLocalModel from '@models/accountLocalModel'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/user:/local/password/reset [POST]', () => {
  let user: TestUser
  let localAuth: { email: string}

  before(async () => {
    user = await testUtil.createUser()
    localAuth = await user.createLocalAuth()
    // sinonStubMailer.reset()
  })

  it('email validation - 400', async () => {
    const { status, body } = await agent.post('/local/password/reset')
    expect(status).to.equals(400)
  })

  it('no password auth - 403', async () => {
    const { status, body } = await agent.post('/local/password/reset').send({ email: 'asdsdfj12d@gmasdasd.aa' })
    expect(status).to.equals(403)
  })

  // it('check own', async () => {
  //   const email = 'zvsx001@gmail.com'
  //   await userAccountsLocalModel.create({ email, password: 'xxx' })
  //   const { status, body } = await agent.post('/auth/reset-password').send({ email })
  //
  //   expect(status).to.equals(200)
  // })

  it('works', async () => {
    const password = 'ZZZZZ'
    const genStub = sinon.stub(generator, 'generate').returns(password)
    const { status, body } = await agent.post('/local/password/reset')
      .send({ email: localAuth.email })
    genStub.restore()

    expect(status).to.equals(200)
    // expect(sinonStubMailer.callCount).to.eq(1)

    const account = await accountLocalModel.getByEmail({ email: localAuth.email })
    if (!account) throw new Error('Account is not found')

    const isPasswordCorrect = await bcrypt.compare(password, account.password)
    expect(isPasswordCorrect).to.eq(true)
  })
})
