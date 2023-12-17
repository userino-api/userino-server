import { Router } from 'express'
import appController from '@controllers/appAuthController'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = {}

router.delete<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { app } = res.locals

    await appController.deleteApp({ app_id: app.id })

    res.send()
  })

export default router
