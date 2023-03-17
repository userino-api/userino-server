import _ from 'lodash'
import { v4 as uuid } from 'uuid'
import client from '../libs/pg'

export interface Token {
  token: string
  user_id: string // uniq per app
  device_id?: string | null
  session?: Record<string, any>
}

async function get(token: string): Promise<Token> {
  const result = await client.query('SELECT * FROM tokens WHERE token = $1 LIMIT 1', [token])
  return _.get(result, 'rows[0]')
}

async function createToken(payload: Pick<Token, 'user_id' | 'device_id'>): Promise<string> {
  const { user_id, device_id } = payload
  const token = uuid()

  await client.query(
    'INSERT INTO tokens (user_id, token, device_id) VALUES ($1, $2, $3)',
    [user_id, token, device_id || null],
  )

  return token
}

async function getByUserID(user_id: string): Promise<Token[]> {
  const { rows } = await client.query(`
    SELECT * FROM tokens WHERE user_id = $1 
    ORDER BY created_at DESC
    LIMIT 1
  `, [user_id])

  return rows
}

async function deleteToken(token: string) {
  const { rowCount } = await client.query('DELETE FROM tokens WHERE token = $1', [token])
  return rowCount
}

async function deleteByUser(user_id: string) {
  const { rowCount } = await client.query('DELETE FROM tokens WHERE user_id = $1', [ user_id ])
  return rowCount
}

async function deleteByAccount(account_id: string) {
  const { rowCount } = await client.query('DELETE FROM tokens WHERE account_id = $1', [ account_id ])
  return rowCount
}

export default {
  get,
  createToken,
  getByUserID,
  deleteToken,
  deleteByUser,
  deleteByAccount,
}
