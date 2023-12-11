import { createJoiValidator } from '@zvs001/express'
import express from 'express'
import joi from '@libs/joi'
import appUserModel, { UserFull } from '@models/appUserModel'
import organisationController from '../../controllers/organisationController'

const router = express.Router()

interface RouteBody { name: string; username?: string }

type RouteResponse = UserFull[]

const schema = joi.object<RouteBody>({
  name: joi.string().required(),
  // username: joi.string().optional(),
})

router.post<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, {}>('/create',
  createJoiValidator(schema),
  async (req, res) => {
    const { name } = req.body
    const { appUser } = req.session

    const data = await organisationController.create({
      name,
      owner_app_user_id: appUser.id,
    })

    res.send(data)
  })

export default router
