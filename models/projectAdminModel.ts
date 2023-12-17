import client from '../libs/pg'

export interface ProjectAdmin {
  project_id: string
  admin_id: string
  created_at: string | Date
}

async function create(
  payload: Pick<ProjectAdmin, 'project_id' | 'admin_id'>,
) {
  let {
    project_id, admin_id,
  } = payload

  await client.query(`
    INSERT INTO project_admins (project_id, admin_id)
    VALUES                                    (      $1       ,       $2     )
`, [project_id, admin_id])
}

async function get({ admin_id, project_id }: Pick<ProjectAdmin, 'admin_id' | 'project_id'>): Promise<ProjectAdmin | null> {
  const { rows } = await client.query(`
     SELECT * FROM project_admins 
     WHERE project_id = $1, admin_id = $2
   `, [project_id, admin_id])

  return rows[0]
}

async function getByProject({ project_id }: Pick<ProjectAdmin, 'project_id'>): Promise<ProjectAdmin[]> {
  const { rows } = await client.query<ProjectAdmin>('SELECT * FROM project_admins WHERE project_id = $1', [project_id])
  return rows
}

async function getByAdmins({ admin_id }: Pick<ProjectAdmin, 'admin_id'>): Promise<ProjectAdmin[]> {
  const { rows } = await client.query<ProjectAdmin>('SELECT * FROM project_admins WHERE admin_id = $1', [admin_id])
  return rows
}

async function deleteApp(app_id: string) {
  const { rowCount } = await client.query('DELETE FROM projects WHERE id = $1', [app_id])
  return rowCount
}

export default {
  create,
  get,
  getByAdmins,
  getByProject,
  delete: deleteApp,
}
