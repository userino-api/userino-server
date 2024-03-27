import express from 'express'
import { param } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import appUserModel, { AppUser } from '@models/appUserModel'
import usersModel, { User } from '@models/userModel'
import idRouter from './@id/router'
import logs from './logs.get'

const app = express.Router()

app.use([
  logs,
])

export interface RouterLocals {
  appUser: AppUser
  user: User
}

app.use<{ id: string }>('/:id', param('id').isUUID(), checkValidation, async (req, res, next) => {
  const { id } = req.params

  const appUser = await appUserModel.get(id)
  if (!appUser) {
    return res.sendError(404, 'User not Found')
  }

  const user = await usersModel.get(appUser.account_id)

  const locals: RouterLocals = { appUser, user: user as User }
  res.locals = locals

  next()
}, idRouter)

export default app
