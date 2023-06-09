import _ from 'lodash'
import deviceController from '@controllers/deviceController'
import getDeviceInfoFromRequest from '../utils/getDeviceInfoFromRequest'

const onLoginEnd = async (req, { user_id }: { user_id: string}) => {
  const { device } = req.body

  const deviceInfo = getDeviceInfoFromRequest(req)
  if (deviceInfo.device_type === 'web' && _.isObject(device)) {
    await deviceController.syncBrowser({ user_id, device: { id: deviceInfo.device_id, ...device as any } })
  }
}

export default onLoginEnd
