import { checkValidator } from '@zvs001/express'
import express from 'express'
import { body } from 'express-validator'
import getDeviceInfoFromRequest from '../../../../utils/getDeviceInfoFromRequest'
import firebaseFcmTokenModel from '../../models/firebaseFcmTokenModel'
import { RouterLocals } from './router'

const app = express.Router()

interface RouteBody {
  token: string
}

interface RouteResponse {}

app.post<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, RouterLocals>('/fcm-token',
  body('token').isLength({ min: 100, max: 2000 }), // ~1205 chars
  checkValidator,
  async (req, res) => {
    const { token } = req.body
    const { app_id, user_id } = req.session

    const deviceInfo = getDeviceInfoFromRequest(req)
    const changed = await firebaseFcmTokenModel.update({ user_id, device_id: deviceInfo.device_id, token })
    if (!changed) {
      await firebaseFcmTokenModel.create({ user_id, device_id: deviceInfo.device_id, token })
    }
    // const { firebaseApp } = res.locals
    // const authInstance = firebaseApp.auth()

    res.send()
  })

export default app
