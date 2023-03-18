import { expect } from 'chai'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/email/check [POST]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('works', async () => {
    const { status, body } = await agent.post('/email/check').set('authorization', user.token)
    expect(status).to.equals(200)
    expect(body).to.have.property('is_verified', false)
  })
})
