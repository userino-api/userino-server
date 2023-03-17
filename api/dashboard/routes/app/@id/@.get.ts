import { Router } from 'express'
import { App } from '@models/appsModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = App

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { app } = res.locals

    res.send(app)
  })

export default router
