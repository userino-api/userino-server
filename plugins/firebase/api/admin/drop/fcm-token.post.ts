import { Router } from 'express'
import { body, oneOf } from 'express-validator'
import _ from 'lodash'
import { checkValidation } from '@libs/middleWares'
import firebaseFcmTokenModel, { FirebaseFcmToken } from '../../../models/firebaseFcmTokenModel'

const router = Router()

interface RouteBody {
  token: string
}

type RouteResponse = FirebaseFcmToken[]

router.post<{}, RouteResponse, RouteBody, {}, {}>('/fcm-tokens',
  oneOf([
    body('token').isString().toArray(),
    body('token').isArray().toArray(),
  ]),
  checkValidation,
  async (req, res) => {
    const { token } = req.body

    for (let i = 0; i < token.length; i++) {
      const tokenSingle = token[i]
      if (_.isString(tokenSingle)) {
        await firebaseFcmTokenModel.dropToken({ token: tokenSingle })
      }
    }

    res.send([])
  },
)

export default router
