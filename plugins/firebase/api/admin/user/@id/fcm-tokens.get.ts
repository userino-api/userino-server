import { Router } from 'express'
import firebaseFcmTokenModel, { FirebaseFcmToken } from '../../../../models/firebaseFcmTokenModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {}

type RouteResponse = FirebaseFcmToken[]

router.get<{}, RouteResponse, RouteBody, {}, RouteLocals>('/fcm-tokens',
  async (req, res) => {
    const { appUser } = res.locals

    const tokens = await firebaseFcmTokenModel.getByUser({ user_id: appUser.id })

    res.send(tokens)
  },
)

export default router
