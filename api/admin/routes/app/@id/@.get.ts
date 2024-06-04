import { Router } from 'express'
import { App } from '@models/appModel'
import projectModel from '@models/projectModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = App

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { app } = res.locals

    const project = await projectModel.get(app.id)

    const appFull = {
      ...app,
      project,
    }

    res.send(appFull)
  })

export default router
