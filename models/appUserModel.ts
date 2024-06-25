import invariant from 'invariant'
import _ from 'lodash'
import format from 'pg-format'
import { v4 as uuid } from 'uuid'
import db from '../libs/pg'
import { User } from './userModel'

export interface AppUser {
  account_id: string
  id: string
  app_id: string
  project_id: string
  created_at: string
}

export interface UserFull extends User, AppUser{ }

export type UserAccountCreatePayload = Pick<AppUser,
  'account_id' | 'app_id' | 'project_id'
  >

async function create(
  payload: UserAccountCreatePayload,
): Promise<string> {
  let {
    app_id, account_id, project_id,
  } = payload
  const id = uuid()

  await db.query(`
    INSERT INTO app_users (id, app_id, account_id, project_id)
    VALUES                           ($1,     $2   ,        $3       ,        $4      )
`, [id, app_id, account_id, project_id])

  return id
}

async function get(id: string): Promise<AppUser | null> {
  const { rows } = await db.query('SELECT * FROM app_users WHERE id = $1', [id])
  return rows[0]
}

async function getMany(ids: string[]): Promise<UserFull[]> {
  if (_.isEmpty(ids)) return []

  const sql = format(`
    SELECT users.*, app_users.* FROM app_users 
    LEFT JOIN users ON app_users.account_id = users.id
    WHERE app_users.id IN (%L)
  `, ids)
  const { rows } = await db.query(sql)

  return rows
}

async function getWithProfile(id: string): Promise<AppUser & User> {
  const { rows } = await db.query(`
    SELECT * FROM app_users 
    LEFT JOIN users ON app_users.account_id = users.id
    WHERE app_users.id = $1
  `, [id])

  return rows[0]
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

async function getUserCountByApp({ app_id }:{ app_id: string}): Promise<number> {
  const { rows } = await db.query('SELECT count(*) as count FROM app_users WHERE app_id = $1', [app_id])
  const count = parseInt(rows[0].count)
  return count
}

async function setAccountId({ id, account_id }: Pick<AppUser, 'id' | 'account_id'>) {
  invariant(id, 'setAccountId requires valid id')
  invariant(account_id, 'setAccountId requires valid account_id')

  const { rowCount } = await db.query('update app_users set account_id = $2 where id = $1', [id, account_id])
  return rowCount
}

async function deleteUser(id: string) {
  const { rowCount } = await db.query('DELETE FROM app_users WHERE id = $1', [id])
  return rowCount
}

export default {
  create,
  get,
  getWithProfile,
  getByAccountId,
  getMany,
  getAllByAccountId,
  getUserCountByApp,
  setAccountId,
  delete: deleteUser,
}
