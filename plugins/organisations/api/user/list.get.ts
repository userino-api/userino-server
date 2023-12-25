import express from 'express'
import _ from 'lodash'
import appUserModel, { UserFull } from '@models/appUserModel'
import organisationAdminModel from '../../models/organisationAdminModel'

const router = express.Router()

interface RouteBody {}

type RouteResponse = UserFull[]

router.get<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, {}>('/list', async (req, res) => {
  const { appUser } = req.session

  const list = await organisationAdminModel.getByUser({ app_user_id: appUser.id })
  const users = await appUserModel.getMany(_.map(list, item => item.organisation_id))

  res.send(users)
})

export default router
