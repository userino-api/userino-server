import db from '../libs/pg'

export interface UserLocalization {
  account_id: string
  time_zone: string
  country_iso2: string
  country_iso3: string
  language: string
  languages: string[]
  created_at: string
  updated_at: string
}

const get = async ({ account_id }: Pick<UserLocalization, 'account_id'>): Promise<UserLocalization | null> => {
  const { rows = [] } = await db.query<UserLocalization>('SELECT * FROM user_localization WHERE account_id = $1 LIMIT 1', [account_id])
  return rows[0]
}

async function create(params: Pick<UserLocalization, 'account_id'>) {
  const { account_id } = params

  const { rowCount } = await db.query(`
    INSERT INTO user_localization(account_id)
    VALUES                                      (  $1   ) 
  `, [account_id])

  return rowCount
}

async function setTimeZone({ account_id, time_zone }: Pick<UserLocalization, 'account_id' | 'time_zone'>) {
  const { rowCount } = await db.query(`
    UPDATE user_localization 
    SET time_zone = $2
    WHERE account_id = $1`, [account_id, time_zone])

  return rowCount
}

export default {
  create,
  get,
  setTimeZone,
}
