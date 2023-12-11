import { expect } from 'chai'
import appsModel from '@models/appsModel'
import agent from '../../../../../../api/user/tests/testServer'
import createOrganisation, { TestOrganisation } from '../../../../tests/helpers/createOrganisation'
import testUtil, { TestUser } from '../../../../tests/testUtils'

describe('/organisation/:id/login [POST]', () => {
  let user: TestUser
  let organisation: TestOrganisation

  before(async () => {
    const defaultApp = await appsModel.getPrimaryApp()
    user = await testUtil.createUser()
    organisation = await createOrganisation({ user_id: user.id })
  })

  it('can login to organisation', async () => {
    const { status, body } = await agent.post(`/organisation/${organisation.id}/login`).set('authorization', user.token)
    expect(status).to.equals(200)
    expect(body).to.have.property('token')
  })
})
