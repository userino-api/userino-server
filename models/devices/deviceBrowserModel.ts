import db from '../../libs/pg'

export interface UserBrowser {
  user_id: string
  id: string
  language: string
  languages: string[]
  time_zone: string
  created_at: string
}

const get = async ({ id, user_id }: Pick<UserBrowser, 'user_id' | 'id'>): Promise<UserBrowser | null> => {
  const { rows = [] } = await db.query<UserBrowser>(
    'SELECT * FROM devices.browsers WHERE user_id = $1 AND id = $2 LIMIT 1',
    [user_id, id],
  )
  return rows[0]
}

async function create(params: Pick<UserBrowser, 'user_id' | 'id' | 'language' | 'languages' | 'time_zone'>): Promise<number> {
  const {
    user_id, id, language, languages, time_zone,
  } = params

  const { rowCount } = await db.query(`
    INSERT INTO devices.browsers (user_id, id, language, languages, time_zone)
    VALUES                       (  $1   , $2,    $3   ,     $4   ,     $5   ) 
  `, [user_id, id, language, JSON.stringify(languages || []), time_zone])

  return rowCount
}

async function setLanguage(params: Pick<UserBrowser, 'user_id' | 'id' | 'language' | 'languages'>): Promise<number> {
  const {
    user_id, id, language, languages,
  } = params
  const { rowCount } = await db.query(`
    UPDATE devices.browsers 
    SET language = $3, languages = $4
    WHERE user_id = $1 AND id = $2`, [user_id, id, language, languages])

  return rowCount
}

export default {
  create,
  get,
  setLanguage,
}
