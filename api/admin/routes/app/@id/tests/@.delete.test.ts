import { expect } from 'chai'
import dayjs from 'dayjs'
import testUtil, { TestAdmin, TestApp } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/app/:id [DELETE]', () => {
  let app: TestApp
  let admin: TestAdmin

  before(async () => {
    admin = await testUtil.createAdmin()
    app = await testUtil.createApp()
  })

  it('it works', async () => {
    const timeMoment = dayjs()
    const { status, body } = await agent.delete(`/app/${app.id}`).set('authorization', admin.authorization)

    expect(status).to.equals(200)
  })
})
