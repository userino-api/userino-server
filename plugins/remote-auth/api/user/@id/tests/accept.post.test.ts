import { expect } from 'chai'
import moment from 'moment'
import agent from '../../../../../../api/user/tests/testServer'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import remoteAuthSessionModel from '../../../../models/remoteAuthSessionModel'

describe('/remote/:id/accept [POST]', () => {
  let remote_id: string
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
    remote_id = await remoteAuthSessionModel.create({ expires_at: moment().add(10, 'minutes').toISOString() })
  })

  it('works', async () => {
    const { status, body } = await agent.post(`/remote/${remote_id}/accept`).set('authorization', user.token)
    expect(status).to.equals(200)

    const itemAfter = await remoteAuthSessionModel.get({ id: remote_id })
    expect(itemAfter).to.deep.include({
      user_id: user.id,
      is_approved: true,
    })
  })
})
