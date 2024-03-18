import { expect } from 'chai'
import dayjs from 'dayjs'
import userLogModel from '@models/userLogModel'
import testUtil, { TestAdmin, TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/user/:id [DELETE]', () => {
  let user: TestUser
  let admin: TestAdmin

  before(async () => {
    user = await testUtil.createUser()
    admin = await testUtil.createAdmin()
  })

  it('it works', async () => {
    const timeMoment = dayjs()
    const { status, body } = await agent.delete(`/user/${user.user_id}`).set('authorization', admin.authorization)

    expect(status).to.equals(200)

    const appUser = await user.fetch()
    expect(appUser).is.undefined

    const userLogs = await userLogModel.getByApp({ app_id: user.app_id, start_at: timeMoment.toISOString() })
    expect(userLogs).to.have.lengthOf(1)
    expect(userLogs[0]).to.deep.include({
      user_id: user.id,
      account_id: user.account_id,
    })
  })
})
