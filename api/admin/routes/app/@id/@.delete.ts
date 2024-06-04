import { Router } from 'express'
import userController from '@controllers/userController'
import { AppUser } from '@models/appUserModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = AppUser

router.delete<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { app } = res.locals

    await userController.deleteUser({ id: app.id })

    res.send()
  })

export default router
