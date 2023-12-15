import db from '../../libs/pg'

export interface Mobile extends ObjectTimestamps {
  id: string
  device_key?: string
  device_name?: string
  model?: string
  manufacturer?:string
  system_name?: string
  system_version?: string
  country?: string
  language?: string
  language_tag?: string
  time_zone?: string
  languages?: any
  brand?: string
}

const get = async ({ id }: Pick<Mobile, 'id' >): Promise<Mobile | null> => {
  const { rows = [] } = await db.query<Mobile>(
    'SELECT * FROM devices.mobiles WHERE id = $1 LIMIT 1',
    [id],
  )
  return rows[0]
}

async function create(device: Pick<Mobile,
  'id' | 'device_name' | 'device_key' | 'system_name' | 'manufacturer' | 'model' | 'system_version'
  | 'country' | 'language' | 'language_tag' | 'time_zone' | 'languages' | 'brand'>,
) {
  const {
    id, device_name, device_key, system_name, system_version, manufacturer, model, country, language_tag, language, time_zone, languages,
    brand,
  } = device

  const { rowCount } = await db.query(`
    INSERT INTO devices.mobiles (id, device_name, device_key, system_name, system_version, manufacturer, model, 
            country, language_tag, language, time_zone, languages, brand)
    VALUES                      ($1,      $2    ,     $3    ,     $4     ,       $5      ,       $6    ,  $7  ,
              $8   ,     $9     ,    $10  ,    $11   ,    $12    ,  $13 ) 
  `, [
    id, device_name, device_key, system_name, system_version, manufacturer,
    model, country, language_tag, language, time_zone, JSON.stringify(languages), brand,
  ])

  return rowCount
}

async function update(device: Pick<Mobile,
  'id' | 'device_name' | 'device_key' | 'system_name' | 'manufacturer' | 'model' | 'system_version'
  | 'country' | 'language' | 'language_tag' | 'time_zone' | 'languages' | 'brand'>,
) {
  const {
    id, device_name, device_key, system_name, system_version, manufacturer, model, country, language_tag, language, time_zone, languages = [], brand,
  } = device

  const { rowCount } = await db.query(`
    UPDATE devices.mobiles 
    SET
        device_name = $2, 
        device_key = $3, 
        system_name = $4, 
        system_version = $5, 
        manufacturer = $6, 
        model = $7,
        country = $8,
        language_tag = $9, 
        language = $10, 
        time_zone = $11, 
        languages = $12,
        updated_at = NOW(),
        brand = $13
    WHERE id = $1
  `, [
    id, device_name, device_key, system_name, system_version, manufacturer,
    model, country, language_tag, language, time_zone, JSON.stringify(languages), brand,
  ])

  return rowCount
}

export default {
  create,
  get,
  update,
}
