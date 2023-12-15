import invariant from 'invariant'
import { v4 as uuid } from 'uuid'
import client from '../libs/pg'

export interface Account {
  id: string
  project_id: string

  // email and phone is multi-source and created to be able to link different authorization sources to same.
  email?: string | null
  phone_number?: string | null
  is_phone_verified?: boolean
  created_at: string | Date
}

async function create(params: Pick<Account, 'phone_number' | 'email' | 'project_id'>): Promise<string> {
  let {
    email, phone_number, project_id,
  } = params
  const id = uuid()
  email = email?.toLowerCase()

  await client.query(`
    INSERT INTO accounts (id, email, phone_number, project_id)
    VALUES                          ($1,   $2 ,          $3             ,      $4       )
`, [id, email, phone_number, project_id])

  return id
}

async function get(account_id: string): Promise<Account | null> {
  const { rows } = await client.query('SELECT * FROM accounts WHERE id = $1', [account_id])
  return rows[0]
}

async function getByPhone({ phone_number, project_id }: Pick<Account, 'phone_number' | 'project_id'>): Promise<Account | null> {
  invariant(phone_number, 'getByPhone requires valid auth_local_id')

  const { rows = [] } = await client.query(`
     SELECT * FROM accounts WHERE phone_number = $1 AND project_id = $2
  `, [phone_number, project_id])

  return rows[0]
}

async function deleteAccount(account_id: string) {
  const { rowCount } = await client.query('DELETE FROM accounts WHERE id = $1', [account_id])
  return rowCount
}

// todo phone can be moved here
// async function deleteByPhoneNumber({ phone, role }: { phone: string; role: UserAccount['role'] }) {
//   const { rowCount } = await client.query('DELETE FROM accounts WHERE phone_number = $1 AND role = $2', [phone, role])
//   return rowCount
// }
//
// async function setPhoneVerified({ user_id, is_phone_verified }: Pick<UserAccount, 'user_id' | 'is_phone_verified'>) {
//   const { rowCount } = await db.query(`
//     UPDATE user_accounts set is_phone_verified = $2
//     WHERE user_id = $1
//   `, [user_id, is_phone_verified])
//
//   return rowCount
// }

async function setPhoneNumber(
  {
    id, phone_number, is_phone_verified, project_id,
  }:
    Pick<Account, 'id' | 'project_id' | 'phone_number' | 'is_phone_verified'>,
) {
  const { rowCount } = await client.query(`
    UPDATE accounts 
    SET phone_number = $3, is_phone_verified = $4
    WHERE id = $1 AND project_id = $2
  `, [id, project_id, phone_number, is_phone_verified])

  return rowCount
}

// async function setPhoneNumber(
//   { user_id, phone_number, is_phone_verified }:
//   Pick<UserAccount, 'user_id' | 'phone_number' | 'is_phone_verified'>,
// ) {
//   const { rowCount } = await db.query(`
//     UPDATE user_accounts
//     SET phone_number = $2, is_phone_verified = $3
//     WHERE user_id = $1
//   `, [user_id, phone_number, is_phone_verified])
//
//   return rowCount
// }

// async function getByPhoneNumber({ phone_number, role }: Pick<UserAccount, 'phone_number' | 'role'>): Promise<UserAccount | null> {
//   const { rows } = await db.query(
//     'SELECT * FROM user_accounts WHERE phone_number = $1 AND role = $2',
//     [phone_number, role],
//   )
//   return rows[0]
// }

async function getByEmail({ email, project_id }: Pick<Account, 'email' | 'project_id'>): Promise<Account | null> {
  const { rows = [] } = await client.query('SELECT * FROM accounts WHERE email = $1 AND project_id = $2', [email, project_id])
  return rows[0]
}

// async function findVerifiedPhone(phone_number: string) {
//   const { rowCount } = await client.query('select * from user_accounts where is_phone_verified = true and phone_number = $1', [phone_number])
//   return rowCount
// }

// async function setBlockedStatus({ user_id, is_blocked }: Pick<UserAccount, 'user_id' | 'is_blocked'>) {
//   const { rowCount } = await client.query('update user_accounts set is_blocked = $2 where user_id = $1', [user_id, is_blocked])
//   return rowCount
// }

async function setEmail({ id, email }: Pick<Account, 'id' | 'email'>) {
  invariant(id, 'setLocalAuthId requires valid id')
  invariant(email, 'setLocalAuthId requires valid email')

  const { rowCount } = await client.query('UPDATE accounts SET email = $2 WHERE id = $1', [id, email])
  return rowCount
}

export default {
  create,
  get,
  getByEmail,
  getByPhone,
  setPhoneNumber,
  setEmail,
  delete: deleteAccount,
}
