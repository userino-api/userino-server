import client from '@libs/pg'

export interface FirebaseAccount {
  project_id: string
  firebase_id: string
  account_id: string
}

async function create(params: Pick<FirebaseAccount, 'account_id' | 'firebase_id' | 'project_id'>) {
  const { account_id, firebase_id, project_id } = params
  await client.query(`
    INSERT INTO firebase.accounts(firebase_id, account_id, project_id)
    VALUES                                        (       $1       ,        $2       ,      $3        )
  `, [firebase_id, account_id, project_id])
}

async function get(params: Pick<FirebaseAccount, 'firebase_id' | 'project_id'>): Promise<FirebaseAccount | null> {
  const { firebase_id, project_id } = params
  const { rows } = await client.query<FirebaseAccount>(`
    SELECT * FROM firebase.accounts
    WHERE firebase_id = $1 AND project_id = $2
  `, [firebase_id, project_id])

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
