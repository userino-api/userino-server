import express from 'express'
import { checkValidation } from '@libs/middleWares'
import { Mobile } from '@models/devices/deviceMobileModel'
import deviceUserMobileModel from '@models/devices/deviceUserMobileModel'

const app = express.Router()

type RouteResponse = Mobile[]
app.get<{}, RouteResponse, {}, {}>('/list',
  checkValidation,
  async (req, res) => {
    const { account_id, user_id } = req.session

    const list = await deviceUserMobileModel.getUserDevices({ user_id })

    res.send(list)
  },
)

export default app
