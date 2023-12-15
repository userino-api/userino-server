import client from '@libs/pg'

export interface AppAuthProvider {
  key: string
  project_id: string
  is_enabled: boolean
  created_at: string | Date
}

async function create(
  payload: Pick<AppAuthProvider, 'key' | 'project_id'> & { is_enabled?: boolean},
): Promise<string> {
  const { key, project_id, is_enabled = false } = payload

  await client.query(`
    INSERT INTO project_auth_list (project_id, key, is_enabled)
    VALUES                    (  $1  , $2 ,     $3    )
`, [project_id, key, is_enabled])

  return key
}

async function get(payload: Pick<AppAuthProvider, 'key' | 'project_id'>): Promise<AppAuthProvider | null> {
  const { project_id, key } = payload
  const { rows } = await client.query('SELECT * FROM project_auth_list WHERE project_id = $1 AND key = $2', [project_id, key])
  return rows[0]
}

async function getByApp(payload: Pick<AppAuthProvider, 'project_id'>): Promise<AppAuthProvider[]> {
  const { project_id } = payload
  const { rows } = await client.query('SELECT * FROM project_auth_list WHERE project_id = $1', [project_id])
  return rows
}

async function setEnabled({ key, is_enabled, project_id }: Pick<AppAuthProvider, 'key' | 'is_enabled' | 'project_id'>) {
  const { rowCount } = await client.query(`
    UPDATE project_auth_list
    SET is_enabled = $3
    WHERE project_id = $1 AND key = $2
  `, [project_id, key, is_enabled])

  return rowCount
}

export default {
  create,
  get,
  getByApp,
  setEnabled,
}
