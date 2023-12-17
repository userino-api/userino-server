import { expect } from 'chai'
import { v4 } from 'uuid'
import appsModel from '@models/appModel'
import agent from '../../../../../api/user/tests/testServer'
import createOrganisation, { TestOrganisation } from '../../../tests/helpers/createOrganisation'
import testUtil, { TestUser } from '../../../tests/testUtils'

describe('/organisation/list [GET]', () => {
  let user: TestUser
  let organisation: TestOrganisation

  before(async () => {
    const defaultApp = await appsModel.getPrimaryApp()
    user = await testUtil.createUser()
    organisation = await createOrganisation({ user_id: user.id })
  })

  it('works', async () => {
    const { status, body } = await agent.get('/organisation/list').set('authorization', user.token)
    expect(status).to.equals(200)
    expect(body).to.have.lengthOf(1)
  })
})
