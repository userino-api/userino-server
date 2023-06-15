import { expect } from 'chai'
import { v4 } from 'uuid'
import deviceMobileModel from '@models/devices/deviceMobileModel'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/device/list [GET]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('works', async () => {
    const id = v4()
    const { status, body } = await agent.get('/device/list').set('authorization', user.token)
      .send({ id })
    expect(status).to.equals(200)

    expect(body).to.have.lengthOf(0)
  })
})
