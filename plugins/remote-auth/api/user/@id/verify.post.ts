import express from 'express'
import appController from '@controllers/appController'
import expressUtils from '@libs/express/expressUtils'
import onLoginEnd from '../../../../../hooks/onLoginEnd'
import getDeviceInfoFromRequest from '../../../../../utils/getDeviceInfoFromRequest'
import { RouterLocals } from '../router'

const router = express.Router()

interface RouteBody {}

type RouteResponse = {
  is_approved: false
} | {
  token: string
  is_approved: true
}

router.post<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, RouterLocals>('/verify',
  async (req, res) => {
    const { app_id, user_id } = req.session
    const { remoteSession } = res.locals
    const ip = expressUtils.getClientIP(req) as string

    if (!remoteSession.is_approved) {
      return res.send({ is_approved: false })
    }

    const deviceInfo = getDeviceInfoFromRequest(req)
    const authInfo = await appController.authorize({ ...deviceInfo, user_id: remoteSession.user_id, ip })

    res.send({
      is_approved: true,
      ...authInfo,
    })

    await onLoginEnd(req, { user_id })
  })

export default router
