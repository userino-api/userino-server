import { faker } from '@faker-js/faker'
import { expect } from 'chai'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/me/name [POST]', () => {
  let user: TestUser
  let user2: TestUser

  before(async () => {
    user = await testUtil.createUser()
    user2 = await testUtil.createUser()
  })

  it('works', async () => {
    const name = faker.person.fullName()
    const { status, body } = await agent.post('/me/name').send({ name }).set('authorization', user.token)
    expect(status).to.equals(200)
    expect(body).to.deep.include({
      changed: 1,
    })

    const userAfter = await user.fetch()
    expect(userAfter).to.deep.include({
      name,
    })
  })
})
