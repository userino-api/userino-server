import { Router } from 'express'
import configAuthController from '@controllers/configAuthController'
import firebaseAppConfigModel from '../../../../models/firebaseAppConfigModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
}

router.post<{}, {}, RouteBody, {}, RouteLocals>('/enable',
  async (req, res) => {
    const { project } = res.locals

    const configExists = await firebaseAppConfigModel.get({ project_id: project.id })
    if (!configExists) {
      return res.sendError(403, 'App config is required to make it work')
    }

    await configAuthController.enableAuth({
      key: 'firebase',
      project_id: project.id,
    })

    res.send()
  },
)

export default router
