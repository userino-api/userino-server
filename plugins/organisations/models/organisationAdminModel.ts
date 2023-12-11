import client from '@libs/pg'

export interface OrganisationAdmin {
  organisation_id: string
  app_user_id: string
  created_at: string
}

async function create(params: Pick<OrganisationAdmin, 'organisation_id' | 'app_user_id'>) {
  const { organisation_id, app_user_id } = params
  await client.query(`
    INSERT INTO organisations.organisation_admins ( organisation_id, app_user_Id)
    VALUES                                                                     (           $1            ,         $2         )
  `, [organisation_id, app_user_id])
}

async function get(params: Pick<OrganisationAdmin, 'organisation_id' | 'app_user_id'>): Promise<OrganisationAdmin> {
  const { organisation_id, app_user_id } = params
  const { rows } = await client.query<OrganisationAdmin>(`
      SELECT * FROM organisations.organisation_admins
      WHERE organisation_id = $1 AND app_user_id = $2
  `, [organisation_id, app_user_id])

  return rows[0]
}

async function getByUser(params: Pick<OrganisationAdmin, 'app_user_id'>): Promise<OrganisationAdmin[]> {
  const { app_user_id } = params
  const { rows } = await client.query<OrganisationAdmin>(`
      SELECT * FROM organisations.organisation_admins
      WHERE app_user_id = $1
  `, [app_user_id])

  return rows
}
export default {
  create,
  get,
  getByUser,
}
