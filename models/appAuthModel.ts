import client from '@libs/pg'

export interface AppAuthProvider {
  key: string
  app_id: string
  is_enabled: boolean
  created_at: string | Date
}

async function create(
  payload: Pick<AppAuthProvider, 'key' | 'app_id'> & { is_enabled?: boolean},
): Promise<string> {
  const { key, app_id, is_enabled = false } = payload

  await client.query(`
    INSERT INTO app_auth_list (app_id, key, is_enabled)
    VALUES                    (  $1  , $2 ,     $3    )
`, [app_id, key, is_enabled])

  return key
}

async function get(payload: Pick<AppAuthProvider, 'key' | 'app_id'>): Promise<AppAuthProvider | null> {
  const { app_id, key } = payload
  const { rows } = await client.query('SELECT * FROM app_auth_list WHERE app_id = $1 AND key = $2', [app_id, key])
  return rows[0]
}

async function getByApp(payload: Pick<AppAuthProvider, 'app_id'>): Promise<AppAuthProvider[]> {
  const { app_id } = payload
  const { rows } = await client.query('SELECT * FROM app_auth_list WHERE app_id = $1', [app_id])
  return rows
}

async function setEnabled({ key, is_enabled, app_id }: Pick<AppAuthProvider, 'key' | 'is_enabled' | 'app_id'>): Promise<number> {
  const { rowCount } = await client.query(`
    UPDATE app_auth_list
    SET is_enabled = $3
    WHERE app_id = $1 AND key = $2
  `, [app_id, key, is_enabled])

  return rowCount
}

export default {
  create,
  get,
  getByApp,
  setEnabled,
}
