import { Router } from 'express'
import configAuthController from '@controllers/configAuthController'
import mediaAppConfigModel from '../../../../models/mediaAppConfigModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
}

router.post<{}, {}, RouteBody, {}, RouteLocals>('/enable',
  // checkValidation,
  async (req, res) => {
    const { app } = res.locals

    const configExists = await mediaAppConfigModel.get({ app_id: app.id })
    if (!configExists) {
      return res.sendError(403, 'App config is required to make it work')
    }

    await configAuthController.enableAuth({
      key: 'media',
      app_id: app.id,
    })

    res.send()
  },
)

export default router
