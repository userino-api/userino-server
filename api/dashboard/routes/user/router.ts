import { checkValidator } from '@zvs001/express'
import express from 'express'
import { param } from 'express-validator'
import appUserModel, { AppUser } from '@models/appUserModel'
import idRouter from './@id/router'

const router = express.Router()

export interface RouterLocals {
  appUser: AppUser
}

// router.use([
// ])

router.use<{ id: string }>('/:id', param('id').isUUID(), checkValidator, async (req, res, next) => {
  const { id } = req.params

  const appUser = await appUserModel.get(id)
  if (!appUser) {
    return res.sendError(404, 'User not Found')
  }

  const locals: RouterLocals = { appUser }
  res.locals = locals

  next()
}, idRouter)

export default router
