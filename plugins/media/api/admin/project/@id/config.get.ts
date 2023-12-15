import { Router } from 'express'
import mediaAppConfigModel, { MediaAppConfig } from '../../../../models/mediaAppConfigModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
}

type RouteResponse = MediaAppConfig | null

router.get<{}, RouteResponse, RouteBody, {}, RouteLocals>('/config',
  async (req, res) => {
    const { project } = res.locals

    const config = await mediaAppConfigModel.get({ project_id: project.id })

    res.send(config)
  },
)

export default router
