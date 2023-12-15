import { Router } from 'express'
import _ from 'lodash'
import firebaseAppConfigModel, { FirebaseAppConfig } from '../../../../models/firebaseAppConfigModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
  fileRaw: Record<string, any>
}

type RouteResponse = FirebaseAppConfig | null

router.get<{}, RouteResponse, RouteBody, {}, RouteLocals>('/config',
  async (req, res) => {
    const { project } = res.locals

    const config = await firebaseAppConfigModel.get({ project_id: project.id })

    res.send(config)
  },
)

export default router
