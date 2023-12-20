import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { param } from 'express-validator'
import authMiddleWares from '@middlewares/authMiddleWares'
import organisationAdminModel, { OrganisationAdmin } from '../../models/organisationAdminModel'
import idRouter from './@id/router'
import create from './create.post'
import listGet from './list.get'

const router = Router()

router.use(authMiddleWares.checkAuthCore)
router.use([
  listGet,
  create,
])

export interface RouterLocals {
  organisationAdmin: OrganisationAdmin
}

router.use<{id: string}>('/:id', param('id').isUUID(), checkValidator, async (req, res, next) => {
  const { appUser } = req.session
  const { id } = req.params

  const orgAdmin = await organisationAdminModel.get({ organisation_id: id, app_user_id: appUser.id })
  if (!orgAdmin) return res.sendError(403, 'You are not admin of this organisation')

  const locals: RouterLocals = {
    organisationAdmin: orgAdmin,
  }
  res.locals = locals

  next()
}, idRouter)

export default router
