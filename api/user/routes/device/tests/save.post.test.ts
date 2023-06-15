import { expect } from 'chai'
import { v4 } from 'uuid'
import deviceBrowserModel from '@models/devices/deviceBrowserModel'
import deviceMobileModel from '@models/devices/deviceMobileModel'
import { TestUser } from '../../../../../test/helpers/methods/createUser'
import testUtil from '../../../../../test/helpers/testUtil'
import deviceObjects from '../../../../../test/objects/deviceObjects'
import agent from '../../../tests/testServer'

describe('/user:/device/save [POST]', () => {
  let user: TestUser
  const mobile_id = v4()

  before(async () => {
    user = await testUtil.createUser()
  })

  it('[mobile] can save device with minimum fields', async () => {
    const id = v4()
    const { status, body } = await agent.post('/device/save').set('authorization', user.token)
      .set('device-type', 'ios')
      .send({ id })
    expect(status).to.equals(200)

    const device = await deviceMobileModel.get({ id })
    expect(device).is.not.empty
  })

  it('[browser] can save device with minimum fields', async () => {
    const id = mobile_id
    const { status, body } = await agent.post('/device/save').set('authorization', user.token)
      .set('device-type', 'web')
      .send({ id })
    expect(status).to.equals(200)

    const device = await deviceBrowserModel.get({ id })
    expect(device).is.not.empty
  })

  it('[mobile] can update maximum fields', async () => {
    const id = mobile_id
    const data = {
      ...deviceObjects.iosDevice, id,
    }
    const { status, body } = await agent.post('/device/save').set('authorization', user.token)
      .set('device-type', 'ios')
      .send(data)
    expect(status).to.equals(200)

    const device = await deviceMobileModel.get({ id })
    expect(device).to.deep.include({
      id,
      device_key: data.device_key,
      brand: data.brand,
      device_name: data.device_name,
      model: data.model,
      manufacturer: data.manufacturer,
      system_name: data.system_name,
      system_version: data.system_version,
      // installer: data.installer,
      language: data.language,
      language_tag: data.language_tag,
      country: data.country,
      // calendar: data.calendar,
      time_zone: data.time_zone,
      languages: data.languages,
    })
  })
})
