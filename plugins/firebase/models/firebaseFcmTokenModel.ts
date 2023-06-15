import client from '@libs/pg'

export interface FirebaseFcmToken {
  user_id: string
  device_id?: string | null
  token: string
  updated_at: string
  created_at: string
}

async function create(params: Pick<FirebaseFcmToken, 'user_id' | 'device_id' | 'token'>) {
  const { user_id, device_id, token } = params
  await client.query(`
    INSERT INTO firebase.fcm_tokens (user_id, device_id, token)
    VALUES                          (  $1   ,    $2    ,   $3 )
  `, [user_id, device_id, token])
}

async function update(params: Pick<FirebaseFcmToken, 'user_id' | 'device_id' | 'token'>): Promise<number> {
  const { user_id, device_id, token } = params
  const { rowCount } = await client.query(`
    UPDATE firebase.fcm_tokens 
    SET token = $3, updated_at = NOW()
    WHERE user_id = $1 AND device_id = $2
  `, [user_id, device_id, token])

  return rowCount
}

async function getByUser(params: Pick<FirebaseFcmToken, 'user_id'>): Promise<FirebaseFcmToken[]> {
  const { user_id } = params
  const { rows } = await client.query<FirebaseFcmToken>(`
    SELECT * FROM firebase.fcm_tokens
    WHERE user_id = $1
  `, [user_id])

  return rows
}

async function dropToken(params: Pick<FirebaseFcmToken, 'token'>): Promise<FirebaseFcmToken[]> {
  const { token } = params
  const { rows } = await client.query<FirebaseFcmToken>(`
    DELETE FROM firebase.fcm_tokens
    WHERE token = $1
  `, [token])

  return rows
}

export default {
  create,
  update,
  getByUser,
  dropToken,
}
