import client from '@libs/pg'

export interface FirebaseAccount {
  firebase_id: string
  account_id: string
}

async function create(params: Pick<FirebaseAccount, 'account_id' | 'firebase_id'>) {
  const { account_id, firebase_id } = params
  await client.query(`
    INSERT INTO firebase.accounts(firebase_id, account_id)
    VALUES                       (    $1     ,    $2     )
  `, [firebase_id, account_id])
}

async function get(params: Pick<FirebaseAccount, 'firebase_id'>): Promise<FirebaseAccount | null> {
  const { firebase_id } = params
  const { rows } = await client.query<FirebaseAccount>(`
    SELECT * FROM firebase.accounts
    WHERE firebase_id = $1
  `, [firebase_id])

  return rows[0]
}

async function getByAccount(params: Pick<FirebaseAccount, 'account_id'>): Promise<FirebaseAccount | null> {
  const { account_id } = params
  const { rows } = await client.query<FirebaseAccount>(`
    SELECT * FROM firebase.accounts
    WHERE account_id = $1
  `, [account_id])

  return rows[0]
}

export default {
  create,
  get,
  getByAccount,
}
