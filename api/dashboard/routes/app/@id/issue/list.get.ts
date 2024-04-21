import { Router } from 'express'
import issueModel from '@models/issues/issueModel'
import { RouterLocals } from '../../router'

const router = Router()

type RouteBody = {}
type RouteResponse = any[]

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/list',
  async (req, res) => {
    const { app } = res.locals

    const list = await issueModel.getByApp({ app_id: app.id })

    res.send(list)
  })

export default router
