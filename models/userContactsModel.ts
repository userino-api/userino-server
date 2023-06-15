import invariant from 'invariant'
import db from '../libs/pg'

export interface AccountContacts {
  account_id: string
  email?: string | null
  is_email_verified: boolean
  phone_number?: string | null
}

const get = async ({ account_id }: Pick<AccountContacts, 'account_id'>): Promise<AccountContacts | null> => {
  const { rows = [] } = await db.query('SELECT * FROM user_contacts WHERE account_id = $1 LIMIT 1', [ account_id ])

  return rows[0]
}

async function create(params:
  Pick<AccountContacts, 'account_id' | 'email' | 'phone_number'> &
  Partial<Pick<AccountContacts, 'is_email_verified'>>,
): Promise<number> {
  const {
    account_id, email, phone_number, is_email_verified,
  } = params

  const { rowCount } = await db.query(`
      INSERT INTO user_contacts(account_id, email, phone_number, is_email_verified)
      VALUES                   (    $1    ,  $2  ,      $3     ,        $4        ) 
  `, [account_id, email, phone_number, is_email_verified])

  return rowCount
}

async function setEmailVerified(params: Pick<AccountContacts, 'account_id' | 'email' | 'is_email_verified'>): Promise<number> {
  const {
    account_id, email, is_email_verified,
  } = params
  invariant(account_id, 'account_id is null')
  invariant(email, 'email is null')

  const { rowCount } = await db.query(`
    UPDATE user_contacts
    SET is_email_verified = $3
    WHERE account_id = $1 AND email = $2
  `, [account_id, email, is_email_verified])

  return rowCount
}

// async function setUserEmail(params: Pick<AccountContacts, 'account_id' | 'email'>): Promise<number> {
//   const {
//     account_id, email,
//   } = params
//   invariant(account_id, 'account_id is null')
//   invariant(email, 'email is null')
//
//   // todo do we need to reset is_email_verified?
//
//   const { rowCount } = await db.query(`
//     UPDATE user_contacts
//     SET email = $2
//     WHERE account_id = $1
//   `, [account_id, email])
//
//   return rowCount
// }

export default {
  create,
  get,
  setEmailVerified,
}
