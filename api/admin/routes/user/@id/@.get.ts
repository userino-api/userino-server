import { Router } from 'express'
import { AppUser } from '@models/appUserModel'
import { RouterLocals } from '../router'

const app = Router()

type RouteBody = { }
type RouteResponse = AppUser

app.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { user, appUser } = res.locals

    const appUserFull = {
      ...user,
      ...appUser,
    }

    res.send(appUserFull)
  })

export default app
