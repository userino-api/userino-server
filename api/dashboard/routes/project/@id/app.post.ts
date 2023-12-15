import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { body } from 'express-validator'
import appsModel, { App } from '@models/appsModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { name: string }
type RouteResponse = App

router.post<{}, RouteResponse, RouteBody, {}, RouterLocals>('/app',
  body('name').isString(),
  checkValidator,
  async (req, res) => {
    const { name } = req.body
    const { project } = res.locals

    const app_id = await appsModel.create({
      name,
      project_id: project.id,
    })

    const app = await appsModel.get(app_id)

    res.send(app as App)
  })

export default router
