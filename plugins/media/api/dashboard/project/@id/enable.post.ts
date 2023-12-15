import { Router } from 'express'
import configAuthController from '@controllers/configAuthController'
import mediaAppConfigModel from '../../../../models/mediaAppConfigModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
}

router.post<{}, {}, RouteBody, {}, RouteLocals>('/enable',
  async (req, res) => {
    const { project } = res.locals

    const configExists = await mediaAppConfigModel.get({ project_id: project.id })
    if (!configExists) {
      return res.sendError(403, 'App config is required to make it work')
    }

    await configAuthController.enableAuth({
      key: 'media',
      project_id: project.id,
    })

    res.send()
  },
)

export default router
