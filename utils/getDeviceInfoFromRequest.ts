import express from 'express'

function getDeviceInfoFromRequest(req: express.Request) {
  if (!req) {
    return {
      device_type: null,
      device_id: null,
    }
  }
  const { headers } = req

  const type: 'web' | 'ios' | 'android' | undefined = headers['device-type'] as any
  let device_id = headers['device']
  if (device_id) device_id = device_id.toString()

  return {
    device_type: type,
    device_id,
  }
}
export default getDeviceInfoFromRequest
