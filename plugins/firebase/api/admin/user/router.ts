import { Router } from 'express'
import { param } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import appUserModel, { AppUser } from '@models/appUserModel'
import idRouter from './@id/router'

const router = Router()

export interface RouteLocals {
  appUser: AppUser
}

router.use('/:id',
  param('id').isUUID(),
  checkValidation,
  async (req, res, next) => {
    const { id } = req.params

    const appUser = await appUserModel.get(id)
    if (!appUser) return res.sendError(404, 'User is not found')

    const locals: RouteLocals = { appUser }
    res.locals = locals

    next()
  },
  idRouter,
)

export default router
