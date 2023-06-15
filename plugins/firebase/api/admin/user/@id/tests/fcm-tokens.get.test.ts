import { expect } from 'chai'
import { v4 } from 'uuid'
import agent from '../../../../../../../api/admin/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil, { TestUser } from '../../../../../../../test/helpers/testUtil'
import firebaseAppConfigModel from '../../../../../models/firebaseAppConfigModel'
import firebaseFcmTokenModel from '../../../../../models/firebaseFcmTokenModel'

describe('/admin:/user/:id/fcm-tokens [GET]', () => {
  let app: TestApp
  let user: TestUser
  let token = v4()

  before(async () => {
    app = await testUtil.createApp()
    user = await testUtil.createUser()
    const device_id = await user.createDevice()
    await firebaseFcmTokenModel.create({
      user_id: user.user_id,
      token,
      device_id,
    })
  })

  it('works', async () => {
    const { status, body } = await agent.get(`/firebase/user/${user.id}/fcm-tokens`)
    expect(status).to.eq(200)

    expect(body).to.have.lengthOf(1)
    expect(body[0]).to.deep.include({
      token,
    })
  })
})
