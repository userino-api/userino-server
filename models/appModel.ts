import { v4 as uuid } from 'uuid'
import client from '../libs/pg'

export interface App {
  id: string
  project_id: string
  name: string
  is_primary: boolean
  created_at: string | Date
}

async function create(
  payload: Pick<App, 'name' | 'project_id'>,
): Promise<string> {
  let {
    name, project_id,
  } = payload
  const id = uuid()

  await client.query(`
    INSERT INTO apps (id, name, project_id)
    VALUES                  ($1,   $2  ,       $3      )
`, [id, name, project_id])

  return id
}

async function get(app_id: string): Promise<App | null> {
  const { rows } = await client.query('SELECT * FROM apps WHERE id = $1', [app_id])
  return rows[0]
}

async function getAll(): Promise<App[]> {
  const { rows } = await client.query('SELECT * FROM apps', [])
  return rows
}

async function getPrimaryApp(): Promise<App> {
  const { rows } = await client.query('SELECT * FROM apps WHERE is_primary = true')
  return rows[0]
}

async function getByProject({ project_id }: Pick<App, 'project_id'>): Promise<App[]> {
  const { rows } = await client.query<App>('SELECT * FROM apps WHERE project_id = $1', [project_id])
  return rows
}

async function deleteApp(app_id: string) {
  const { rowCount } = await client.query('DELETE FROM apps WHERE id = $1', [app_id])
  return rowCount
}

export default {
  create,
  get,
  getAll,
  getPrimaryApp,
  getByProject,
  delete: deleteApp,
}
