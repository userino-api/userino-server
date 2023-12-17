import { Router } from 'express'
import appModel, { App } from '@models/appModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = App[]

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/apps',
  async (req, res) => {
    const { project } = res.locals

    const apps = await appModel.getByProject({ project_id: project.id })

    res.send(apps)
  })

export default router
