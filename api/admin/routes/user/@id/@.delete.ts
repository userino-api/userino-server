import { Router } from 'express'
import userController from '@controllers/userController'
import { AppUser } from '@models/appUserModel'
import { RouterLocals } from '../router'

const app = Router()

type RouteBody = { }
type RouteResponse = AppUser

app.delete<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { user, appUser } = res.locals

    await userController.deleteUser({ id: appUser.id })

    res.send()
  })

export default app
