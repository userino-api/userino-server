import { expect } from 'chai'
import randomstring from 'randomstring'
import { v4 as uuid } from 'uuid'
import mediaAppConfigModel from '../../../../../../plugins/media/models/mediaAppConfigModel'
import { TestUser } from '../../../../../../test/helpers/methods/createUser'
import testUtil, { TestAdmin, TestApp } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/user/:id/asset [POST]', () => {
  let user: TestUser
  let app: TestApp
  let admin: TestAdmin

  before(async () => {
    admin = await testUtil.createAdmin()
    app = await testUtil.createApp()
    user = await testUtil.createUser({ app_id: app.id })
    await mediaAppConfigModel.create({
      project_id: app.project.id,
      client_secret: uuid(),
      client_id: uuid(),
    })
  })

  it('works', async () => {
    const asset_id = randomstring.generate({ charset: 'alphanumeric', length: 40 })
    const { status, body } = await agent.post(`/user/${user.id}/asset`).send({ asset_id }).set('authorization', admin.authorization)
    expect(status).to.equals(200)
    expect(body).to.deep.include({
      changed: 1,
    })

    const userAfter = await user.fetch()
    expect(userAfter).to.deep.include({
      asset_id,
    })
  })
})
