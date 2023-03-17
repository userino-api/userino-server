import client from '@libs/pg'

export interface UserSecret {
  user_id: string
  secret: string
  created_at: string
}

async function create(params: Pick<UserSecret, 'user_id' | 'secret'>) {
  const { user_id, secret } = params
  await client.query(`
    INSERT INTO authenticator.user_secrets (user_id, secret)
    VALUES                                 (  $1   ,   $2  )
  `, [user_id, secret])
}

async function get(params: Pick<UserSecret, 'user_id'>): Promise<UserSecret | null> {
  const { user_id } = params
  const { rows } = await client.query<UserSecret>(`
    SELECT * FROM authenticator.user_secrets
    WHERE user_id = $1
  `, [user_id])

  return rows[0]
}

export default {
  create,
  get,
}
