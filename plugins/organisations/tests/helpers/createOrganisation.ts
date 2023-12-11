import testUtilParent, { TestUser } from '../../../../test/helpers/testUtil'
import organisationAdminModel from '../../models/organisationAdminModel'

export class TestOrganisation {
  id:string

  organisation_id: string

  user: TestUser

  owner_id: string

  constructor(params: { user: TestUser; owner_id: string}) {
    this.user = params.user
    this.id = params.user.id
    this.organisation_id = params.user.id
    this.owner_id = params.owner_id
  }
}

async function createOrganisation(params: { user_id: string}) {
  const user = await testUtilParent.createUser({ type: 'organisation' })
  await organisationAdminModel.create({
    organisation_id: user.id,
    app_user_id: params.user_id,
  })

  const testOrganisation = new TestOrganisation({ user, owner_id: params.user_id })

  return testOrganisation
}

export default createOrganisation
