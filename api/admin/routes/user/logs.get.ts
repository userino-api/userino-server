import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { query } from 'express-validator'
import userLogModel from '@models/userLogModel'

const router = Router()

type RouteQuery = {
  start_at: string
}

router.get<{}, {}, {}, RouteQuery>('/logs', query('start_at').isString(), checkValidator, async (req, res) => {
  const { app_id } = req.session || {}
  const { start_at } = req.query

  if (!app_id) return res.sendError(409, 'App context is required for this route')

  const list = await userLogModel.getByApp({
    app_id, start_at,
  })

  res.send(list)
})

export default router
