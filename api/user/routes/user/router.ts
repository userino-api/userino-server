import { Router } from 'express'
import { param } from 'express-validator'
import appUserModel, { AppUser } from '@models/appUserModel'
import idRouter from './@id/router'

const router = Router()

export interface RouterLocals {
  appUser: AppUser
}
router.use<{ id: string }>('/:id', param('id').isUUID(), async (req, res, next) => {
  const { id } = req.params

  const appUser = await appUserModel.get(id)
  if (!appUser) return res.sendError(404, 'Not Found')

  const locals: RouterLocals = { appUser }
  res.locals = locals

  next()
}, idRouter)

export default router
