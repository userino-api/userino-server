import db from '../../libs/pg'

export interface UserMobile {
  id: string
  user_id: string
  device_key: string
  device_name: string
  model: string
  manufacturer:string
  system_name: string
  system_version: string
  data: Record<string, any>
  updated_at: string
  created_at: string
}

const get = async ({ id, user_id }: Pick<UserMobile, 'user_id' | 'id' >): Promise<UserMobile | null> => {
  const { rows = [] } = await db.query<UserMobile>(
    'SELECT * FROM devices.mobiles WHERE user_id = $1 AND id = $2 LIMIT 1',
    [user_id, id],
  )
  return rows[0]
}

async function create(device: Pick<UserMobile,
  'user_id' | 'id' | 'data' | 'device_name' | 'device_key' | 'system_name' | 'manufacturer' | 'model' | 'system_version'>,
): Promise<number> {
  const {
    id, user_id, data, device_name, device_key, system_name, system_version, manufacturer, model,
  } = device

  const { rowCount } = await db.query(`
    INSERT INTO devices.mobiles (user_id, id, data, device_name, device_key, system_name, system_version, manufacturer, model)
    VALUES                      (  $1   , $2,  $3 ,     $4     ,     $5    ,      $6    ,       $7      ,      $8     ,   $9 ) 
  `, [user_id, id, JSON.stringify(data), device_name, device_key, system_name, system_version, manufacturer, model])

  return rowCount
}

export default {
  create,
  get,
}
