import db from '../../libs/pg'

export interface UserBrowser extends ObjectTimestamps {
  user_id: string
  id: string
  language: string
  languages: string[]
  time_zone: string
}

const get = async ({ id }: Pick<UserBrowser, 'id'>): Promise<UserBrowser | null> => {
  // todo here we might receive array
  const { rows = [] } = await db.query<UserBrowser>(
    'SELECT * FROM devices.browsers WHERE id = $1 LIMIT 1',
    [id],
  )
  return rows[0]
}

const getUserDevice = async ({ id, user_id }: Pick<UserBrowser, 'user_id' | 'id'>): Promise<UserBrowser | null> => {
  const { rows = [] } = await db.query<UserBrowser>(
    'SELECT * FROM devices.browsers WHERE user_id = $1 AND id = $2 LIMIT 1',
    [user_id, id],
  )
  return rows[0]
}

async function create(params: Pick<UserBrowser, 'user_id' | 'id' | 'language' | 'languages' | 'time_zone'>) {
  const {
    user_id, id, language, languages, time_zone,
  } = params

  const { rowCount } = await db.query(`
    INSERT INTO devices.browsers (user_id, id, language, languages, time_zone)
    VALUES                       (  $1   , $2,    $3   ,     $4   ,     $5   ) 
  `, [user_id, id, language, JSON.stringify(languages || []), time_zone])

  return rowCount
}

async function update(params: Pick<UserBrowser, 'id' | 'language' | 'languages' | 'time_zone'>) {
  const {
    id, language, languages, time_zone,
  } = params

  const { rowCount } = await db.query(`
    UPDATE devices.browsers
    SET language = $2, 
        time_zone = $3,
        languages = $4,
        updated_at = now()
    WHERE id = $1
  `, [id, language, time_zone, JSON.stringify(languages || [])])

  return rowCount
}

export default {
  create,
  get,
  getUserDevice,
  update,
}
