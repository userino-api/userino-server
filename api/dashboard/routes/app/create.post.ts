import { Router } from 'express'
import { body } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import appsModel, { App } from '@models/appsModel'
import { RouterLocals } from './router'

const router = Router()

type RouteBody = { name: string }
type RouteResponse = App

router.post<{}, RouteResponse, RouteBody, {}, RouterLocals>('/create',
  body('name').isString(),
  checkValidation,
  async (req, res) => {
    const { name } = req.body

    const app_id = await appsModel.create({
      name,
    })

    const app = await appsModel.get(app_id)

    res.send(app as App)
  })

export default router
