import { Router } from 'express'
import appAuthModel, { AppAuthProvider } from '@models/appAuthModel'
import { RouterLocals } from '../../router'

const router = Router()

type RouteBody = { }
type RouteResponse = AppAuthProvider[]

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/list',
  async (req, res) => {
    const { app } = res.locals

    const authList = await appAuthModel.getByApp({ app_id: app.id })

    res.send(authList)
  })

export default router
