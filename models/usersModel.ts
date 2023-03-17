import _ from 'lodash'
import format from 'pg-format'
import db from '../libs/pg'

export interface User {
  id: string
  avatar_url?: string | null
  name?: string | null
  first_name?: string | null
  last_name?: string | null
  created_at: string
}

const get = async (user_id: string): Promise<User | null> => {
  const { rows = [] } = await db.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [ user_id ])

  return rows[0]
}

async function create(params: Pick<User, 'id' | 'name' | 'first_name' | 'last_name' | 'avatar_url'>): Promise<number> {
  const {
    id, name, first_name, last_name, avatar_url,
  } = params
  const { rowCount } = await db.query(`
      INSERT INTO users(id, name, first_name, last_name, avatar_url)
      VALUES           ($1,  $2 ,     $3    ,     $4   ,    $5     ) 
  `, [  id, name, first_name, last_name, avatar_url ])

  return rowCount
}

async function getArray(user_ids: string[]): Promise<User[]> {
  if (_.isEmpty(user_ids)) return []
  const sql = format('SELECT * FROM users WHERE id IN (%L)', user_ids)
  const { rows = [] } = await db.query(sql)
  return rows
}

export default {
  create,
  get,
  getArray,
}
