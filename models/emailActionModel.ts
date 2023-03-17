import { v4 as uuid } from 'uuid'
import client from '../libs/pg'

interface EmailAction {
  user_id: string
  email: string
  action: 'email/verify' | 'email/reset-password'
  code: string
  metadata?: Record<string, any>
  is_done: boolean
  expired_at: string
  created_at: string
}

async function create(
  payload: Pick<EmailAction,
     'user_id' | 'email'  | 'action' | 'expired_at' | 'metadata'
  >,
): Promise<string> {
  const {
    action, metadata, expired_at, user_id, email,
  } = payload

  const code = uuid().replace(/-/g, '')

  await client.query(`
    INSERT INTO email_actions (user_id, action, metadata, email, expired_at, code)
    VALUES                    (  $1   ,   $2  ,    $3   ,  $4  ,     $5    ,  $6 )
  `, [user_id, action, metadata, email, expired_at, code])

  return code
}

async function get({ code }: Pick<EmailAction, 'code'>): Promise<EmailAction | null> {
  const { rows = [] } = await client.query('SELECT * FROM email_actions WHERE code = $1', [code])
  return rows[0]
}

async function setDone({ code, is_done }: Pick<EmailAction, 'code' | 'is_done'>): Promise<number> {
  const { rowCount } = await client.query(`
    UPDATE email_actions
    SET is_done = $2
    WHERE code = $1
  `, [code, is_done])

  return rowCount
}

export default {
  create,
  get,
  setDone,
}
