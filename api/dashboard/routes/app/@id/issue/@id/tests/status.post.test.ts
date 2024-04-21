import { expect } from 'chai'
import { v4 } from 'uuid'
import issueModel from '@models/issues/issueModel'
import testUtil, { TestApp, TestUser } from '../../../../../../../../test/helpers/testUtil'
import agent from '../../../../../../tests/testServer'

describe('/dashboard:/app/:id/issue/:id/status [GET]', () => {
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
    const { status, body } = await agent.post(`/app/${app.id}/issue/${issue_id}/status`).send({ status: 'closed' })

    expect(status).to.equals(200)

    const issueAfter = await issueModel.get(issue_id)
    expect(issueAfter).to.deep.include({
      status: 'closed',
    })
  })

  it('send invalid status - 400', async () => {
    const { status, body } = await agent.post(`/app/${app.id}/issue/${issue_id}/status`).send({ status: 'bored' })

    expect(status).to.equals(422)
  })
})
