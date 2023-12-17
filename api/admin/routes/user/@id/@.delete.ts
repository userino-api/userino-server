import { Router } from 'express'
import appController from '@controllers/appAuthController'
import { AppUser } from '@models/appUserModel'
import { RouterLocals } from '../router'

const app = Router()

type RouteBody = { }
type RouteResponse = AppUser

app.delete<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { user, appUser } = res.locals

    await appController.deleteConnection(appUser)

    res.send()
  })

export default app
