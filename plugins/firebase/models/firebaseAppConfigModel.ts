import client from '@libs/pg'

export interface FirebaseAppConfig {
  app_id: string
  config: Record<string, any>
  is_valid: boolean
  updated_at: string
  created_at: string
}

async function get(params: Pick<FirebaseAppConfig, 'app_id'>): Promise<FirebaseAppConfig | null> {
  const { app_id } = params
  const { rows } = await client.query<FirebaseAppConfig>(`
    SELECT * FROM firebase.app_configs
    WHERE app_id = $1
  `, [app_id])

  return rows[0]
}

async function create(params: Pick<FirebaseAppConfig, 'app_id' | 'config'>) {
  const { app_id, config } = params
  await client.query(`
    INSERT INTO firebase.app_configs (app_id, config)
    VALUES                           (  $1  ,   $2  )
  `, [app_id, config])
}

async function setConfig(params: Pick<FirebaseAppConfig, 'app_id' | 'config'>) {
  const { app_id, config } = params
  await client.query(`
    UPDATE firebase.app_configs
    SET config = $2
    WHERE app_id = $1 
  `, [app_id, config])
}

export default {
  create,
  get,
  setConfig,
}
