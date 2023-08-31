import { expect } from 'chai'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/issue/list [GET]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('works', async () => {
    const { status, body } = await agent.get('/issue/list').set('authorization', user.token)
    expect(status).to.equals(200)

    expect(body.list).to.have.lengthOf(0)
  })
})
