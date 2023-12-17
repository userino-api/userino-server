import { licenceApi } from '@octoguild-licence/client'
import { Router } from 'express'
import { RouterLocals } from '../../router'

const router = Router()

type RouteBody = {}
type RouteResponse = any[]

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/list',
  (req, res) => {
    const { app } = res.locals

    licenceApi.getRefClients({
      app_ref: app.id,
    }, list => {
      res.send(list)
    })
  })

export default router
