import express from 'express'
import { body } from 'express-validator'
import deviceController from '@controllers/deviceController'
import { checkValidation } from '@libs/middleWares'
import getDeviceInfoFromRequest from '../../../../utils/getDeviceInfoFromRequest'

const app = express.Router()

interface RouteBody {
  id: string
  [key: string]: any
}
app.post<{}, {}, RouteBody, {}>('/save',
  body('id').isString(),
  checkValidation,
  async (req, res) => {
    const { account_id, user_id } = req.session
    const device = req.body

    const deviceInfo = await getDeviceInfoFromRequest(req)

    if (deviceInfo.device_type === 'web') {
      await deviceController.syncBrowser({ user_id, device })
    } else if (deviceInfo.isMobile) {
      await deviceController.syncMobile({ user_id, device })
    } else {
      return res.sendError(400, 'Device type is not recognised')
    }

    res.send()
  })

export default app
