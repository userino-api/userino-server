import { expect } from 'chai'
import moment from 'moment'
import agent from '../../../../../../api/user/tests/testServer'
import testUtil, { TestUser } from '../../../../../../test/helpers/testUtil'
import remoteAuthSessionModel from '../../../../models/remoteAuthSessionModel'

describe('/remote/:id [GET]', () => {
  let remote_id: string
  let user:TestUser

  before(async () => {
    user = await testUtil.createUser()
    remote_id = await remoteAuthSessionModel.create({ expires_at: moment().add(10, 'minutes').toISOString() })
  })

  it('works', async () => {
    const { status, body } = await agent.get(`/remote/${remote_id}`)
    expect(status).to.equals(200)
    expect(body).to.deep.include({
      id: remote_id,
    })
    expect(body).to.have.property('expires_at')
  })
})
