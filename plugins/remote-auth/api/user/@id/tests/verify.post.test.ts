import { expect } from 'chai'
import moment from 'moment'
import agent from '../../../../../../api/user/tests/testServer'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import remoteAuthSessionModel from '../../../../models/remoteAuthSessionModel'

describe('/remote/:id/verify [POST]', () => {
  let remote_id: string
  let user:TestUser

  before(async () => {
    user = await testUtil.createUser()
    remote_id = await remoteAuthSessionModel.create({ expires_at: moment().add(10, 'minutes').toISOString() })
  })

  it('works', async () => {
    const { status, body } = await agent.post(`/remote/${remote_id}/verify`)
    expect(status).to.equals(200)
    expect(body).to.deep.include({
      is_approved: false,
    })
  })

  it('approved works', async () => {
    await remoteAuthSessionModel.approve({
      id: remote_id,
      user_id: user.id,
    })
    const { status, body } = await agent.post(`/remote/${remote_id}/verify`)
    expect(status).to.equals(200)
    expect(body).to.deep.include({
      is_approved: true,
    })

    expect(body.token).is.an('string')
  })
})
