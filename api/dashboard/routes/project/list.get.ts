import { Router } from 'express'
import projectModel, { Project } from '@models/projectModel'
import { RouterLocals } from './router'

const router = Router()

type RouteBody = { }
type RouteResponse = Project[]

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/list',
  async (req, res) => {
    const apps = await projectModel.getAll()

    res.send(apps)
  })

export default router
