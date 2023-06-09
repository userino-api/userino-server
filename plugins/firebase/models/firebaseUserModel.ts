import client from '@libs/pg'

export interface FirebaseUser {
  firebase_id: string
  data: Record<string, any>
}

async function create(params: Pick<FirebaseUser, 'firebase_id' | 'data'>) {
  const { firebase_id, data } = params
  await client.query(`
    INSERT INTO firebase.users (firebase_id, data)
    VALUES                     (    $1     ,    $2     )
    ON CONFLICT DO NOTHING
  `, [firebase_id, data])
}

async function get(params: Pick<FirebaseUser, 'firebase_id'>): Promise<FirebaseUser | null> {
  const { firebase_id } = params
  const { rows } = await client.query<FirebaseUser>(`
    SELECT * FROM firebase.users
    WHERE firebase_id = $1
  `, [firebase_id])

  return rows[0]
}

export default {
  create,
  get,
}
