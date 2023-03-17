import invariant from 'invariant'
import _ from 'lodash'
import { v4 as uuid } from 'uuid'
import db from '../libs/pg'

export interface AppUser {
  account_id: string
  id: string
  app_id: string
  created_at: string
}

export type UserAccountCreatePayload = Pick<AppUser,
  'account_id' | 'app_id'
  >

async function create(
  payload: UserAccountCreatePayload,
): Promise<string> {
  let {
    app_id, account_id,
  } = payload
  const id = uuid()

  await db.query(`
    INSERT INTO app_users (id, app_id, account_id)
    VALUES                ($1,   $2  ,     $3    )
`, [ id, app_id, account_id])

  return id
}

async function get(id: string): Promise<AppUser | null> {
  const result = await db.query('SELECT * FROM app_users WHERE id = $1', [id])
  return _.get(result, 'rows[0]')
}

async function getByAccountId({ account_id, app_id }: Pick<AppUser, 'account_id' | 'app_id'>): Promise<AppUser | null> {
  invariant(account_id, 'getByAccountId requires valid account_id')
  invariant(account_id, 'getByAccountId requires valid app_id')

  const { rows = [] } = await db.query<AppUser>(`
     SELECT * FROM app_users WHERE account_id = $1 AND app_id = $2 LIMIT 1
  `, [account_id, app_id])

  return rows[0]
}

async function getAllByAccountId({ account_id }: Pick<AppUser, 'account_id'>): Promise<AppUser[]> {
  invariant(account_id, 'getAllByAccountId requires valid account_id')

  const { rows = [] } = await db.query(`
     SELECT * FROM app_users WHERE account_id = $1
  `, [account_id])

  return rows
}

async function setAccountId({ id, account_id }: Pick<AppUser, 'id' | 'account_id'>): Promise<number> {
  invariant(id, 'setAccountId requires valid id')
  invariant(account_id, 'setAccountId requires valid account_id')

  const { rowCount } = await db.query('update app_users set account_id = $2 where id = $1', [id, account_id])
  return rowCount
}

async function deleteUser(id: string): Promise<number> {
  const { rowCount } = await db.query('DELETE FROM app_users WHERE id = $1', [id])
  return rowCount
}

export default {
  create,
  get,
  getByAccountId,
  getAllByAccountId,
  setAccountId,
  delete: deleteUser,
}
