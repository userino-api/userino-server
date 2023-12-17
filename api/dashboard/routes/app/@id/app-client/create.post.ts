import licenceClient from '@octoguild-licence/client'
import { Router } from 'express'
import { RouterLocals } from '../../router'

const router = Router()

type RouteBody = { }
type RouteResponse = {}

router.post<{}, RouteResponse, RouteBody, {}, RouterLocals>('/create',
  (req, res) => {
    const { app } = res.locals

    licenceClient.createClient({ name: app.name, app_ref: app.id }, () => {
      res.send()
    })
  })

export default router
