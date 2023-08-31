import { expect } from 'chai'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import agent from '../../../tests/testServer'

describe('/user:/issue/create [POST]', () => {
  let user: TestUser

  before(async () => {
    user = await testUtil.createUser()
  })

  it('works', async () => {
    const { status, body } = await agent.post('/issue/create').set('authorization', user.token).send({ text: 'I have a problem' })
    expect(status).to.equals(200)
    expect(body).to.have.property('id')
  })
})
