import { checkValidator } from '@zvs001/express'
import express from 'express'
import { param } from 'express-validator'
import appUserModel, { AppUser } from '@models/appUserModel'
import usersModel, { User } from '@models/userModel'
import idRouter from './@id/router'
import logs from './logs.get'

const app = express.Router()

app.use([
  logs,
])

export interface RouterLocals {
  project_id: string
  app_id: string
  appUser: AppUser
  user: User
}

app.use<{ id: string }>('/:id', param('id').isUUID(), checkValidator, async (req, res, next) => {
  const { id } = req.params

  const appUser = await appUserModel.get(id)
  if (!appUser) {
    return res.sendError(404, 'User not Found')
  }

  const user = await usersModel.get(appUser.account_id)

  // todo here we need to check permission

  const locals: RouterLocals = {
    appUser,
    user: user as User,
    project_id: appUser.project_id,
    app_id: appUser.app_id,
  }
  res.locals = locals

  next()
}, idRouter)

export default app
