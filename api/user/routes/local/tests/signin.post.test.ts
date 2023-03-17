import { expect } from 'chai'
import { v4 as uuid } from 'uuid'
// import sinonStubMailer from '../../../../../test/stubs/sinonStubMailerHandleBars'
import agent from '../../../tests/testServer'

describe('/auth/signin [POST]', () => {
  const email = `${uuid()}@mail.com`

  it('validation code - 400', async () => {
    const { status, body } = await agent.post('/signin')
    expect(status).to.equals(400)
  })

  it('it works', async () => {
    // sinonStubMailer.reset()
    const { status, body } = await agent.post('/signin').send({
      email,
      password: '111111',
    })

    expect(status).to.equals(200)
    // expect(sinonStubMailer.callCount).to.eq(1)
  })

  it('email is banned', async () => {
    const { status, body } = await agent.post('/signin').send({
      email: 'zvsx001@elesb.net',
      password: '111111',
    })

    expect(status).to.equals(403)
    expect(body).to.have.property('errorCode', 'auth/email-is-blocked')
  })
})
