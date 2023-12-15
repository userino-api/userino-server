import invariant from 'invariant'
import { Mobile } from '@models/devices/deviceMobileModel'
import db from '../../libs/pg'

export interface UserMobilePair extends ObjectTimestamps {
  mobile_id: string
  user_id: string
}

export interface UserMobile extends Mobile, UserMobilePair {}

const get = async ({ mobile_id, user_id }: Pick<UserMobilePair, 'user_id' | 'mobile_id'>): Promise<UserMobilePair | null> => {
  const { rows = [] } = await db.query<UserMobile>(`
    SELECT * FROM devices.user_mobiles
    WHERE devices.user_mobiles.user_id = $1 AND devices.user_mobiles.mobile_id = $2
    LIMIT 1
  `, [user_id, mobile_id])

  return rows[0]
}

const getUserDevice = async ({ mobile_id, user_id }: Pick<UserMobile, 'user_id' | 'mobile_id'>): Promise<UserMobile | null> => {
  invariant(mobile_id, 'mobile_id is invalid')
  invariant(user_id, 'user_id is invalid')
  const { rows = [] } = await db.query<UserMobile>(`
    SELECT * FROM devices.mobiles
    LEFT JOIN devices.user_mobiles ON devices.user_mobiles.mobile_id = devices.mobiles.id
    WHERE devices.user_mobiles.user_id = $1 AND devices.mobiles.id = $2
    LIMIT 1
  `, [user_id, mobile_id])

  return rows[0]
}

const getUserDevices = async ({ user_id }: Pick<UserMobile, 'user_id'>): Promise<UserMobile[]> => {
  const { rows = [] } = await db.query<UserMobile>(`
    SELECT * FROM devices.mobiles
    LEFT JOIN devices.user_mobiles ON devices.user_mobiles.mobile_id = devices.mobiles.id
    WHERE devices.user_mobiles.user_id = $1
  `, [user_id])

  return rows
}

async function create(device: Pick<UserMobile,
  'user_id' | 'mobile_id'>,
) {
  const {
    mobile_id, user_id,
  } = device

  const { rowCount } = await db.query(`
    INSERT INTO devices.user_mobiles (user_id, mobile_id)
    VALUES                           (  $1   ,    $2    ) 
    ON CONFLICT DO NOTHING
  `, [user_id, mobile_id])

  return rowCount
}

export default {
  create,
  get,
  getUserDevices,
  getUserDevice,
}
