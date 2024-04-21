import { expect } from 'chai'
import { v4 } from 'uuid'
import issueModel from '@models/issues/issueModel'
import testUtil, { TestApp, TestUser } from '../../../../../../../../test/helpers/testUtil'
import agent from '../../../../../../tests/testServer'

describe('/dashboard:/app/:id/issue/:id [GET]', () => {
  let app: TestApp
  let user :TestUser
  let issue_id: string

  before(async () => {
    app = await testUtil.createApp()
    user = await testUtil.createUser({ app_id: app.id })
    issue_id = await issueModel.create({
      app_id: app.id, app_user_id: user.id, text: v4(), data: {},
    })
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/app/${app.id}/issue/${issue_id}`)

    expect(status).to.equals(200)

    expect(body.user).to.deep.include({
      id: user.account_id,
      name: user.name,
      avatar_url: user.avatar_url,
    })
  })
})
