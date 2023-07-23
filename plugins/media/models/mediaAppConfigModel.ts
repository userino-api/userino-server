import client from '@libs/pg'

export interface MediaAppConfig {
  app_id: string
  client_id: string
  client_secret: string
  is_working: boolean
  updated_at: string
  created_at: string
}

async function get(params: Pick<MediaAppConfig, 'app_id'>): Promise<MediaAppConfig | null> {
  const { app_id } = params
  const { rows } = await client.query<MediaAppConfig>(`
    SELECT * FROM media.app_configs
    WHERE app_id = $1
  `, [app_id])

  return rows[0]
}

async function create(params: Pick<MediaAppConfig, 'app_id' | 'client_id' | 'client_secret'>) {
  const { app_id, client_id, client_secret } = params
  await client.query(`
    INSERT INTO media.app_configs (app_id, client_id, client_secret)
    VALUES                        (  $1  ,     $2   ,       $3     )
  `, [app_id, client_id, client_secret])
}

async function setCredentials(params: Pick<MediaAppConfig, 'app_id' | 'client_secret' | 'client_id'>) {
  const { app_id, client_secret, client_id } = params
  await client.query(`
    UPDATE media.app_configs
    SET client_id = $2, client_secret = $3
    WHERE app_id = $1 
  `, [app_id, client_id, client_secret])
}

export default {
  create,
  get,
  setCredentials,
}
