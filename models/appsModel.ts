import { v4 as uuid } from 'uuid'
import client from '../libs/pg'

export interface App {
  id: string
  name: string
  is_primary: boolean
  created_at: string | Date
}

async function create(
  payload: Pick<App, 'name'>,
): Promise<string> {
  let {
    name,
  } = payload
  const id = uuid()

  await client.query(`
    INSERT INTO apps (id, name)
    VALUES           ($1,  $2 )
`, [ id, name])

  return id
}

async function get(app_id: string): Promise<App | null> {
  const { rows  } = await client.query('SELECT * FROM apps WHERE id = $1', [app_id])
  return rows[0]
}

async function getAll(): Promise<App[]> {
  const { rows  } = await client.query('SELECT * FROM apps', [])
  return rows
}

async function getPrimaryApp(): Promise<App> {
  const { rows  } = await client.query('SELECT * FROM apps WHERE is_primary = true')
  return rows[0]
}

async function deleteApp(app_id: string): Promise<number> {
  const { rowCount } = await client.query('DELETE FROM apps WHERE id = $1', [app_id])
  return rowCount
}

export default {
  create,
  get,
  getAll,
  getPrimaryApp,
  delete: deleteApp,
}
