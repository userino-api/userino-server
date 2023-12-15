import invariant from 'invariant'
import { v4 as uuid } from 'uuid'
import db from '@libs/pg'

export interface Issue {
  id: string
  app_id: string
  app_user_id: string
  text: string
  data?: Record<string, any>
  status: 'resolved' | 'closed' | 'opened'
  updated_at: string
  created_at: string
}

async function create(
  payload: Pick<Issue, 'app_user_id' | 'app_id' | 'text' | 'data'>,
): Promise<string> {
  let {
    app_id, app_user_id, text, data,
  } = payload
  const id = uuid()

  let status: Issue['status'] = 'opened'

  const dataStr = data ? JSON.stringify(data) : null

  await db.query(`
    INSERT INTO issues.issues (id, app_id, app_user_id, text, data, status)
    VALUES                    ($1,   $2  ,     $3     ,  $4 ,  $5 ,   $6  )
`, [
    id, app_id, app_user_id, text, dataStr, status,
  ])

  return id
}

async function get(id: string): Promise<Issue | null> {
  const { rows } = await db.query('SELECT * FROM issues.issues WHERE id = $1', [id])
  return rows[0]
}

async function getByUser(id: string): Promise<Issue[]> {
  const { rows } = await db.query(`
    SELECT * FROM issues.issues 
    WHERE app_user_id = $1
    ORDER BY created_at DESC
    LIMIT 50
  `, [id])

  return rows
}

async function getByApp({ app_id }: Pick<Issue, 'app_id'>): Promise<Issue[]> {
  const { rows = [] } = await db.query<Issue>(`
     SELECT * FROM issues.issues 
     WHERE app_id = $1 
     ORDER BY created_at DESC
     LIMIT 100 
  `, [app_id])

  return rows
}

async function setStatus({ id, status }: Pick<Issue, 'id' | 'status'>) {
  invariant(id, 'setAccountId requires valid id')

  const { rowCount } = await db.query('UPDATE issues.issues SET status = $2 WHERE id = $1', [id, status])
  return rowCount
}

export default {
  create,
  get,
  getByUser,
  getByApp,
  setStatus,
}
