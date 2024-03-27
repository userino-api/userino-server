import dayjs from 'dayjs'
import db from '../libs/pg'

export interface UserLog {
  app_id: string
  user_id: string
  account_id: string
  action: 'DELETED'
  created_at: string
}

async function getByApp({ app_id, start_at }: Pick<UserLog, 'app_id'> & { start_at: string}): Promise<UserLog[]> {
  const timeMoment = dayjs(start_at)

  const { rows = [] } = await db.query(`
    SELECT * FROM user_log
    WHERE app_id = $1 AND created_at >= $2
    ORDER BY created_at ASC
    LIMIT 100
  `, [app_id, timeMoment.toISOString()])

  return rows
}

async function create(params: Pick<UserLog, 'user_id' | 'action' | 'account_id' | 'app_id'>) {
  const {
    app_id, user_id, account_id, action,
  } = params

  const { rowCount } = await db.query(`
      INSERT INTO user_log(app_id, user_id, account_id, action)
      VALUES                        (   $1     ,     $2    ,        $3       ,     $4  ) 
  `, [app_id, user_id, account_id, action])

  return rowCount
}

export default {
  create,
  getByApp,
}
