import express from 'express'
import appController from '@controllers/appController'
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
    const { app_id } = req.session
    const { remoteSession } = res.locals

    if (!remoteSession.is_approved) {
      return res.send({ is_approved: false })
    }

    // step 3
    // const device_id = await deviceController.syncDevice(user_id, device, localize)
    // if (device_id) {
    // // device info must be provided. We may start reject requests without device
    //   req.log('Bug: client didnt provide device_id')
    // }

    // step 4 => Authorize user. Create new token for this user
    const tokens = await appController.authorize({ user_id: remoteSession.user_id })

    res.send({
      is_approved: true,
      ...tokens,
    })
  })

export default router
