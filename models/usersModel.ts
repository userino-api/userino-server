import _ from 'lodash'
import format from 'pg-format'
import db from '../libs/pg'

export interface User {
  id: string
  avatar_url?: string | null
  name?: string | null
  first_name?: string | null
  last_name?: string | null
  type?: 'user' | 'organisation'
  username?: string | null
  created_at: string
}

const get = async (user_id: string): Promise<User | null> => {
  const { rows = [] } = await db.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [user_id])

  return rows[0]
}

async function getByUserName(userName: string): Promise<User | null> {
  if (userName.includes('@')) {
    userName = userName.replace(/@/, '')
  }
  userName = userName.toLowerCase()

  const { rows = [] } = await db.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [userName])

  return rows[0]
}

async function create(params: Pick<User, 'id' | 'name' | 'first_name' | 'last_name' | 'avatar_url' | 'username' | 'type'>) {
  const {
    id, name, first_name, last_name, avatar_url, username, type = 'user',
  } = params

  const { rowCount } = await db.query(`
      INSERT INTO users(id, name, first_name, last_name, avatar_url, username, type)
      VALUES           ($1,  $2 ,     $3    ,     $4   ,    $5     ,    $6   ,  $7) 
  `, [id, name, first_name, last_name, avatar_url, username, type])

  return rowCount
}

async function getArray(user_ids: string[]): Promise<User[]> {
  if (_.isEmpty(user_ids)) return []
  const sql = format('SELECT * FROM users WHERE id IN (%L)', user_ids)
  const { rows = [] } = await db.query(sql)
  return rows
}

async function setUserName({ id, username }: { id: string; username: string}) {
  username = username.toLowerCase()
  const { rowCount } = await db.query(`
    UPDATE users
    SET username = $2
    WHERE id = $1 
  `, [id, username])

  return rowCount
}

async function setName({ id, name }: { id: string; name: string}) {
  const { rowCount } = await db.query(`
    UPDATE users
    SET name = $2
    WHERE id = $1 
  `, [id, name])

  return rowCount
}

export default {
  create,
  get,
  getByUserName,
  getArray,
  setUserName,
  setName,
}
