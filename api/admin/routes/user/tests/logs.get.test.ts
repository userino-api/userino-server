import { licenceClientCheckAuthStub } from '@octoguild-licence/client/test/stub'
import { expect } from 'chai'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import userLogModel from '@models/userLogModel'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil, { TestAdmin, TestApp } from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/admin:/user/logs [GET]', () => {
  let user: TestUser
  let admin: TestAdmin
  let app: TestApp

  before(async () => {
    user = await testUtil.createUser()
    admin = await testUtil.createAdmin()
    app = await testUtil.createApp()

    licenceClientCheckAuthStub.callsFake(
      async (params, cb) => cb({ isAuthorized: true, data: { app_id: '', app_ref: app.id } }),
    )
  })

  it('it works', async () => {
    const checkMoment = dayjs().add(-1, 'hour')
    await userLogModel.create({
      app_id: app.id, user_id: v4(), action: 'DELETED', account_id: v4(),
    })
    const { status, body } = await agent.get('/user/logs').set('authorization', admin.authorization).query({
      start_at: checkMoment.toISOString(),
    })

    expect(status).to.equals(200)
    expect(body).to.have.lengthOf(1)
  })
})
