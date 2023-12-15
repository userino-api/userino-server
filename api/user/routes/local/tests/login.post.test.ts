import { expect } from 'chai'
import randomstring from 'randomstring'
import redis, { redisClient } from '@libs/redis'
import appUserModel from '@models/appUserModel'
import deviceMobileModel from '@models/devices/deviceMobileModel'
import deviceUserMobileModel from '@models/devices/deviceUserMobileModel'
import tokensModel from '@models/tokensModel'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/local/login [POST]', () => {
  let email = 'zvsxoo1@gmail.com'
  let password = '111111'
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
    const localsAuth = await user.createLocalAuth()
    email = localsAuth.email
    password = localsAuth.password
    await redis.flushDb()
  })

  it('validation - 400', async () => {
    const { status, body } = await agent.post('/local/login')
    expect(status).to.equals(400)
  })

  it('no account - 400', async () => {
    const { status, body } = await agent.post('/local/login').send({ email: 'no-account@mail.com', password })
    expect(status).to.equals(403)
  })

  it('invalid password - 403', async () => {
    const { status, body } = await agent.post('/local/login').send({ email, password: 'invalid' })
    expect(status).to.equals(403)
  })

  // it('email is sent when not verified - 409', async () => {
  //   // sinonStubMailer.reset()
  //   const { status, body } = await agent.post('/local/login').send({ email, password })
  //
  //   expect(status).to.equals(409)
  //
  //   // expect(sinonStubMailer.callCount).to.eq(1) // email is sent again
  // })

  it('it works', async () => {
    const { status, body } = await agent.post('/local/login').send({
      email,
      password,
    })

    expect(status).to.equals(200)
    expect(body.token).to.be.a('string')

    const token = await tokensModel.get(body.token)
    // const employee = await employeesModel.get(token.user_id)

    const userAccount = await appUserModel.get(token.user_id)
    expect(userAccount?.account_id).to.eq(user.account_id)
  })

  it('double auth works', async () => {
    const { body: body1 } = await agent.post('/local/login').send({
      email,
      password,
    })

    const token1 = await tokensModel.get(body1.token)
    // const employee = await employeesModel.get(token1.user_id)

    const { body: body2 } = await agent.post('/local/login').send({
      email,
      password,
    })

    const token2 = await tokensModel.get(body2.token)
    // const employee2 = await employeesModel.get(token2.user_id)

    // expect(employee.user_id).is.a('string')
    // expect(employee.user_id).to.eq(employee2.user_id)
  })

  it('check rate limiter', async () => {
    let statusLast: number

    for (let i = 0; i < 15; i++) {
      let { body, status } = await agent.post('/local/login').send({
        email,
        password: randomstring.generate({
          length: 10,
          charset: 'alphabetic',
        }),
      })
      statusLast = status
    }

    // @ts-ignore
    expect(statusLast).to.eq(429)
  })

  const device = {
    id: 'BC13DEEA-C6AF-43A6-B61E-56B10AA9994F',
    device_key: 'iPhone15,2',
    brand: 'Apple',
    device_name: 'iPhone 14 Pro',
    model: 'iPhone 14 Pro',
    manufacturer: 'Apple',
    carrier: 'unknown',
    system_name: 'iOS',
    system_version: '16.4',
    is_tablet: false,
    installer: 'Other',
  }

  it('login with device', async () => {
    await redisClient.flushDb()
    const { status, body } = await agent.post('/local/login').send({
      email,
      password,
      device,
    }).set('device-type', 'ios')

    expect(status).to.equals(200)
    expect(body.token).to.be.a('string')

    const token = await tokensModel.get(body.token)
    // const employee = await employeesModel.get(token.user_id)

    const userAccount = await appUserModel.get(token.user_id)
    expect(userAccount?.account_id).to.eq(user.account_id)

    await testUtil.wait(50) // device is saved after response

    const devices = await deviceUserMobileModel.getUserDevices({ user_id: user.id })
    expect(devices).to.have.lengthOf(1)

    const mobileInfo = await deviceUserMobileModel.getUserDevice({
      user_id: token.user_id,
      mobile_id: device.id,
    })
    expect(mobileInfo).to.deep.include({
      id: 'BC13DEEA-C6AF-43A6-B61E-56B10AA9994F',
      user_id: token.user_id,
      device_key: 'iPhone15,2',
      device_name: 'iPhone 14 Pro',
      model: 'iPhone 14 Pro',
      manufacturer: 'Apple',
      system_name: 'iOS',
      system_version: '16.4',
    })
  })
})
