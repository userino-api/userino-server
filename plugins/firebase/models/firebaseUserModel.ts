import client from '@libs/pg'

export interface FirebaseUser {
  firebase_id: string
  project_id: string
  data: Record<string, any>
}

async function create(params: Pick<FirebaseUser, 'firebase_id' | 'data' | 'project_id'>) {
  const { firebase_id, data, project_id } = params
  await client.query(`
    INSERT INTO firebase.users (firebase_id, data, project_id)
    VALUES                                   (    $1     ,    $2     ,    $3)
    ON CONFLICT DO NOTHING
  `, [firebase_id, data, project_id])
}

async function get(params: Pick<FirebaseUser, 'firebase_id' | 'project_id'>): Promise<FirebaseUser | null> {
  const { firebase_id, project_id } = params
  const { rows } = await client.query<FirebaseUser>(`
    SELECT * FROM firebase.users
    WHERE firebase_id = $1 AND project_id = $2
  `, [firebase_id, project_id])

  return rows[0]
}

export default {
  create,
  get,
}
