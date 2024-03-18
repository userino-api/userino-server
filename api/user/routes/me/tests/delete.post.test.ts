import { expect } from 'chai'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/me/delete [POST]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('works', async () => {
    const { status, body } = await agent.post('/me/delete').set('authorization', user.token)
    expect(status).to.equals(200)

    const userAfter = await user.fetch()
    expect(userAfter).to.be.undefined
  })
})
