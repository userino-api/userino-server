import express from 'express'
import moment from 'moment/moment'
import emailController from '@controllers/emailController'
import joi from '@libs/joi'
import createJoiValidator from '@middlewares/createJoiValidator'
import createCustomIpRateLimiter from '@middlewares/rateLimits/createCustomIpRateLimiter'
import emailActionModel from '@models/emailActionModel'

const app = express.Router()

interface RouteBody {
  code: string
}

interface RouteResponse {
  is_verified: boolean
}

const joiSchema = joi.object<RouteBody>({
  code: joi.string(),
})

app.post<{}, RouteResponse, RouteBody>('/verify',
  createCustomIpRateLimiter({
    key: 'local-email-send-anti-brute', max: 10, timeWindowSeconds: 15 * 60, skipFailedRequests: false,
  }),
  createJoiValidator(joiSchema),
  async (req, res) => {
    // const { app_id, user_id, account_id } = req.session
    const { code } = req.body

    const emailAction = await emailActionModel.get({ code })
    if (!emailAction) return res.sendError(400, 'Invalid verification')
    if (emailAction.action !== 'email/verify') {
      return res.sendError(400, 'Invalid verification')
    }

    if (emailAction.is_done) {
      return res.send({ is_verified: true })
    }

    const expiredAtMoment = moment(emailAction.expired_at)
    if (expiredAtMoment.isBefore(moment())) {
      return res.sendError(403, 'Verification is expired')
    }

    const changed = await emailController.verifyEmail({ code })

    res.send({
      is_verified: true,
    })
  })

export default app
