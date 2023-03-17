import express from 'express'
import createCustomIpRateLimiter from '@middlewares/rateLimits/createCustomIpRateLimiter'
import accountLocalModel from '@models/accountLocalModel'
import authLocalController from '../local/controllers/authLocalController'

const app = express.Router()

interface RouteBody {}

app.post<{}, {}, RouteBody>('/send',
  createCustomIpRateLimiter({
    key: 'local-email-send-anti-brute', max: 10, timeWindowSeconds: 15 * 60, skipFailedRequests: false,
  }),
  async (req, res) => {
    const { app_id, user_id, account_id } = req.session

    const accountLocal = await accountLocalModel.getByAccount({ account_id })
    if (!accountLocal) return res.sendError(403, 'Email account is not exists')

    if (!accountLocal.is_verified) {
      await authLocalController.sendEmailVerification({
        user_id, account_id, app_id, email: accountLocal.email,
      })
    }

    res.send({
      is_verified: accountLocal.is_verified,
    })
  })

export default app
