import { Router } from 'express'
import { Mobile } from '@models/devices/deviceMobileModel'
import deviceUserMobileModel from '@models/devices/deviceUserMobileModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = Mobile[]

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/mobiles',
  async (req, res) => {
    const { appUser } = res.locals

    const devices = await deviceUserMobileModel.getUserDevices({ user_id: appUser.id })

    res.send(devices)
  })

export default router
