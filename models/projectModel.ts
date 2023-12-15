import { v4 as uuid } from 'uuid'
import client from '../libs/pg'

export interface Project {
  id: string
  name: string
  created_at: string | Date
}

async function create(
  payload: Pick<Project, 'name'>,
): Promise<string> {
  let {
    name,
  } = payload
  const id = uuid()

  await client.query(`
    INSERT INTO projects (id, name)
    VALUES                        ($1,   $2  )
`, [id, name])

  return id
}

async function get(app_id: string): Promise<Project | null> {
  const { rows } = await client.query('SELECT * FROM projects WHERE id = $1', [app_id])
  return rows[0]
}

async function getAll(): Promise<Project[]> {
  const { rows } = await client.query('SELECT * FROM projects', [])
  return rows
}

// async function getPrimaryApp(): Promise<Project> {
//   const { rows } = await client.query('SELECT * FROM projects WHERE is_primary = true')
//   return rows[0]
// }

async function deleteApp(app_id: string) {
  const { rowCount } = await client.query('DELETE FROM projects WHERE id = $1', [app_id])
  return rowCount
}

export default {
  create,
  get,
  getAll,
  delete: deleteApp,
}
