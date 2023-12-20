import { createJoiValidator } from '@zvs001/express'
import express from 'express'
import invariant from 'invariant'
import joi from '@libs/joi'
import appModel from '@models/appModel'
import organisationController from '../../controllers/organisationController'

const router = express.Router()

interface RouteBody { name: string; username?: string }

type RouteResponse = { account_id: string }

const schema = joi.object<RouteBody>({
  name: joi.string().required(),
  // username: joi.string().optional(),
})

router.post<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, {}>('/create',
  createJoiValidator(schema),
  async (req, res) => {
    const { name } = req.body
    const { appUser, app_id } = req.session

    const app = await appModel.get(app_id)
    invariant(app, 'app always must exists')

    const data = await organisationController.create({
      project_id: app.project_id,
      name,
      owner_app_user_id: appUser.id,
    })

    res.send(data)
  })

export default router
