import { Router } from 'express'
import mediaAppConfigModel, { MediaAppConfig } from '../../../../models/mediaAppConfigModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
  fileRaw: Record<string, any>
}

type RouteResponse = MediaAppConfig | null

router.get<{}, RouteResponse, RouteBody, {}, RouteLocals>('/config',
  async (req, res) => {
    const { app } = res.locals

    const config = await mediaAppConfigModel.get({ app_id: app.id })

    res.send(config)
  },
)

export default router
