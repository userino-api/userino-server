import { Router } from 'express'
import { Project } from '@models/projectModel'
import userModel from '@models/userModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = Project

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { appUser } = res.locals

    const user = await userModel.get(appUser.account_id)

    res.send(user)
  })

export default router
