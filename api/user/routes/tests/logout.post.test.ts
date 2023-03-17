import { expect } from 'chai'
import tokensModel from '@models/tokensModel'
import testUtil, {
  TestUser,
} from '../../../../test/helpers/testUtil'
import agent from '../../tests/testServer'

describe('/employee/logout [POST]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('user is logged out properly', async () => {
    const { status, body } = await agent.post('/logout').set('authorization', user.token)
    expect(status).to.equals(200)

    const tokenObj = await tokensModel.get(user.token)
    expect(tokenObj).is.undefined
  })
})
