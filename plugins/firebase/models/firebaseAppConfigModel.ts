import client from '@libs/pg'

export interface FirebaseAppConfig {
  project_id: string
  config: Record<string, any>
  is_valid: boolean
  updated_at: string
  created_at: string
}

async function get(params: Pick<FirebaseAppConfig, 'project_id'>): Promise<FirebaseAppConfig | null> {
  const { project_id } = params
  const { rows } = await client.query<FirebaseAppConfig>(`
    SELECT * FROM firebase.app_configs
    WHERE project_id = $1
  `, [project_id])

  return rows[0]
}

async function create(params: Pick<FirebaseAppConfig, 'project_id' | 'config'>) {
  const { project_id, config } = params
  await client.query(`
    INSERT INTO firebase.app_configs (project_id, config)
    VALUES                           (  $1  ,   $2  )
  `, [project_id, config])
}

async function setConfig(params: Pick<FirebaseAppConfig, 'project_id' | 'config'>) {
  const { project_id, config } = params
  await client.query(`
    UPDATE firebase.app_configs
    SET config = $2
    WHERE project_id = $1 
  `, [project_id, config])
}

export default {
  create,
  get,
  setConfig,
}
