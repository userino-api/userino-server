import invariant from 'invariant'
import { v4 as uuid } from 'uuid'
import passwordTool from '@libs/password'
import client from '../libs/pg'

interface AccountLocal {
  id: string // looks like not needed at the moment.
  email: string
  account_id: string // I expect that multiple local auths can direct to single account.
  // Idea that we might have different apps owners on the platforms
  password: string
  is_verified: boolean
  created_at: string
}

async function create(
  payload: Pick<AccountLocal,
    'email' | 'password' | 'account_id'
  >,
): Promise<string> {
  const id = uuid()
  const { email, password, account_id } = payload
  const hash = passwordTool.create(password)

  await client.query(`
    INSERT INTO accounts_local (id, account_id, email, password)
    VALUES                     ($1,     $2    ,  $3  ,    $4   )
  `, [id, account_id, email.toLowerCase(), hash])

  return id
}

async function get(id: string): Promise<AccountLocal | null> {
  invariant(id, 'accountLocalModel.get() required valid id')
  const { rows = [] } = await client.query('SELECT * FROM accounts_local WHERE id = $1', [id])
  return rows[0]
}

async function getByAccount({ account_id }: Pick<AccountLocal, 'account_id'>): Promise<AccountLocal | null> {
  invariant(account_id, 'accountLocalModel.get() required valid id')
  const { rows = [] } = await client.query('SELECT * FROM accounts_local WHERE account_id = $1', [account_id])

  return rows[0]
}

// async function getByUser({ user_id }: { user_id: string }): Promise<AccountLocal | null> {
//   const { rows = [] } = await client.query(`
//     SELECT accounts_local.* FROM accounts_local
//     LEFT JOIN user_accounts ON user_accounts.auth_local_id = accounts_local.id
//     WHERE user_accounts.user_id = $1
//   `, [user_id])
//
//   return rows[0]
// }

async function getByEmail({ email }: Pick<AccountLocal, 'email'>): Promise<AccountLocal | null> {
  const { rows = [] } = await client.query('SELECT * FROM accounts_local WHERE email = $1', [email])
  return rows[0]
}

async function setPassword({ id, password }:  { id: string; password: string}): Promise<number> {
  invariant(id, 'accountLocalModel requires valid user_id')
  const hash = passwordTool.create(password)

  const { rowCount } = await client.query(`
    UPDATE accounts_local
    SET password = $2
    WHERE id = $1
  `, [id, hash])

  return rowCount
}

async function setPasswordByEmail({ email, password }: Pick<AccountLocal, 'email' | 'password'>): Promise<number> {
  const hash = passwordTool.create(password)

  const { rowCount } = await client.query(`
    UPDATE accounts_local
    SET password = $2
    WHERE email = $1
  `, [email, hash])

  return rowCount
}

async function verifyEmail({ email }: Pick<AccountLocal, 'email'>): Promise<number> {
  const { rowCount } = await client.query(`
    UPDATE accounts_local
    SET is_verified = true
    WHERE email = $1
  `, [email])

  return rowCount
}

const deleteLocalAccount = async (id: string): Promise<number> => {
  const { rowCount } = await client.query('DELETE FROM accounts_local WHERE id = $1', [id])
  return rowCount
}

export default {
  create,
  get,
  getByEmail,
  getByAccount,
  verifyEmail,
  setPassword,
  setPasswordByEmail,
  deleteLocalAccount,
}
