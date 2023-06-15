import { expect } from 'chai'
import { v4 } from 'uuid'
import agent from '../../../../../../api/admin/tests/testServer'
import { TestApp } from '../../../../../../test/helpers/methods/createApp'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import firebaseFcmTokenModel from '../../../../models/firebaseFcmTokenModel'

describe('/admin:/drop/fcm-tokens [POST]', () => {
  let app: TestApp
  let user: TestUser
  let token = v4()
  let device_id: string

  before(async () => {
    app = await testUtil.createApp()
    user = await testUtil.createUser()
    device_id = await user.createDevice()
    await firebaseFcmTokenModel.create({
      user_id: user.user_id,
      token,
      device_id,
    })
  })

  it('works with string type', async () => {
    const { status, body } = await agent.post('/firebase/drop/fcm-tokens').send({ token })
    expect(status).to.eq(200)

    const list = await firebaseFcmTokenModel.getByUser({ user_id: user.user_id })
    expect(list).to.have.lengthOf(0)
  })

  it('works with array of strings', async () => {
    await firebaseFcmTokenModel.create({
      user_id: user.user_id,
      token,
      device_id,
    })
    const { status, body } = await agent.post('/firebase/drop/fcm-tokens').send({ token: [token] })
    expect(status).to.eq(200)

    const list = await firebaseFcmTokenModel.getByUser({ user_id: user.user_id })
    expect(list).to.have.lengthOf(0)
  })
})
