import db from '../libs/pg'

export interface UserLocalization {
  user_id: string
  time_zone: string
  country_iso2: string
  country_iso3: string
  language: string
  languages: string[]
  created_at: string
  updated_at: string
}

const get = async (user_id: string): Promise<UserLocalization | null> => {
  const { rows = [] } = await db.query<UserLocalization>('SELECT * FROM user_localization WHERE user_id = $1 LIMIT 1', [user_id])
  return rows[0]
}

async function create(params: Pick<UserLocalization, 'user_id'>) {
  const { user_id } = params

  const { rowCount } = await db.query(`
    INSERT INTO user_localization(user_id)
    VALUES                       (  $1   ) 
  `, [user_id])

  return rowCount
}

async function setTimeZone({ user_id, time_zone }: Pick<UserLocalization, 'user_id' | 'time_zone'>) {
  const { rowCount } = await db.query(`
    UPDATE user_localization 
    SET time_zone = $2
    WHERE user_id = $1`, [user_id, time_zone])

  return rowCount
}

export default {
  create,
  get,
  setTimeZone,
}
