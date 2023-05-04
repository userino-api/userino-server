import express from 'express'
import moment from 'moment/moment'
import middleWares from '@libs/middleWares'
import remoteAuthSessionModel, { RemoteAuthSession } from '../../models/remoteAuthSessionModel'
import { RouterLocals } from './router'

const router = express.Router()

interface RouteBody {}

type RouteResponse = {
  id: string
}

router.post<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, RouterLocals>('/create',
  middleWares.checkValidation,
  async (req, res) => {
    const { app_id, user_id } = req.session

    const expiresAtMoment = moment().add(15, 'minutes')
    const id = await remoteAuthSessionModel.create({ expires_at: expiresAtMoment.toISOString() })

    res.send({
      id,
    })
  })

export default router
