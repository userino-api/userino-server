import { Router } from 'express'
import deviceUserMobileModel, { UserMobile } from '@models/devices/deviceUserMobileModel'
import { RouterLocals } from '../router'

const app = Router()

type RouteBody = { }
type RouteResponse = UserMobile[]

app.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/devices',
  async (req, res) => {
    const { appUser } = res.locals

    const devices = await deviceUserMobileModel.getUserDevices({ user_id: appUser.id })

    res.send(devices)
  })

export default app
