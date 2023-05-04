import { v4 as uuid } from 'uuid'
import client from '@libs/pg'

export interface RemoteAuthSession {
  id: string
  user_id: string
  is_approved: boolean
  expires_at: string
  created_at: string
}

async function create(params: Pick<RemoteAuthSession, 'expires_at'>) {
  const { expires_at } = params

  const id = uuid()

  await client.query(`
    INSERT INTO remote.sessions (id, expires_at)
    VALUES                      ($1,     $2    )
  `, [id, expires_at])

  return id
}

async function get(params: Pick<RemoteAuthSession, 'id'>): Promise<RemoteAuthSession | null> {
  const { id } = params
  const { rows } = await client.query<RemoteAuthSession>(`
    SELECT * FROM remote.sessions
    WHERE id = $1
  `, [id])

  return rows[0]
}

async function approve(params: Pick<RemoteAuthSession, 'id'>): Promise<RemoteAuthSession | null> {
  const { id } = params

  const { rows } = await client.query<RemoteAuthSession>(`
    UPDATE remote.sessions
    SET is_approved = true
    WHERE id = $1
  `, [id])

  return rows[0]
}

export default {
  create,
  get,
  approve,
}
