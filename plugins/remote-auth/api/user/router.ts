import { Router } from 'express'
import { param } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import remoteAuthSessionModel, { RemoteAuthSession } from '../../models/remoteAuthSessionModel'
import idRouter from './@id/router'
import createPost from './create.post'

const router = Router()

router.use([
  createPost,
])

export interface RouterLocals {
  remoteSession: RemoteAuthSession
}
router.use<{ id: string }>('/:id',
  param('id').isUUID(),
  checkValidation,
  async (req, res, next) => {
    const { id } = req.params

    const remoteSession = await remoteAuthSessionModel.get({ id })
    if (!remoteSession) return res.sendError(404, 'Session is not exists')

    const locals: RouterLocals = {
      remoteSession,
    }
    res.locals = locals

    next()
  },
  idRouter)

export default router
