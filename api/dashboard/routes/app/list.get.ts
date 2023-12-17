import { Router } from 'express'
import appsModel, { App } from '@models/appModel'
import { RouterLocals } from './router'

const app = Router()

type RouteBody = { }
type RouteResponse = App[]

app.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/list',
  async (req, res) => {
    const apps = await appsModel.getAll()

    res.send(apps)
  })

export default app
