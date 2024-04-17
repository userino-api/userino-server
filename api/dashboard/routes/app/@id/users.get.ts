import { Router } from 'express'
import appUserModel, { UserFull } from '@models/appUserModel'
import userModel from '@models/userModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteQuery = { offset?: number }
type RouteBody = { }
type RouteResponse = {
  users: UserFull[]
  total: number
  offset: number
}

router.get<{}, RouteResponse, RouteBody, RouteQuery, RouterLocals>('/users',
  async (req, res) => {
    const { app } = res.locals
    const { offset: offsetStr } = req.query

    const offsetN = Number(offsetStr) || 0

    const count = await appUserModel.getUserCountByApp({ app_id: app.id })
    const users = await userModel.getByAppFull({ app_id: app.id, offset: offsetN })

    res.send({
      users,
      total: count,
      offset: offsetN,
    })
  })

export default router
