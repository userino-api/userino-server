import _ from 'lodash'
import deviceController from '@controllers/deviceController'
import getDeviceInfoFromRequest from '../utils/getDeviceInfoFromRequest'

const onLoginEnd = async (req, { user_id }: { user_id: string}) => {
  const { device } = req.body

  const { device_id, device_type, isMobile } = getDeviceInfoFromRequest(req)
  if (_.isObject(device)) {
    if (device_type === 'web') {
      await deviceController.syncBrowser({ user_id, device: { id: device_id, ...device as any } })
    }

    if (isMobile) {
      await deviceController.syncMobile({ user_id, device: { id: device_id, ...device as any } })
    }
  }
}

export default onLoginEnd
