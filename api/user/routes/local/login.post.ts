import bcrypt from 'bcrypt'
import express from 'express'
import { body } from 'express-validator'
import appController from '@controllers/appController'
import expressUtils from '@libs/express/expressUtils'
import middleWares from '@libs/middleWares'
import createCustomIpRateLimiter from '@middlewares/rateLimits/createCustomIpRateLimiter'
import accountLocalModel from '@models/accountLocalModel'
import onLoginEnd from '../../../../hooks/onLoginEnd'

const app = express.Router()

app.post('/login',
  createCustomIpRateLimiter({
    key: 'local-login-anti-brute', max: 10, timeWindowSeconds: 15 * 60, skipFailedRequests: false,
  }),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  middleWares.checkValidation,
  async (req, res) => {
    const { app_id } = req.session
    const ip = expressUtils.getClientIP(req) as string
    let {
      email, password, device,
    } = req.body
    email = email.toLowerCase()

    const localAccount = await accountLocalModel.getByEmail({ email })
    if (!localAccount) {
      return res.sendError(403, 'Incorrect credentials')
    }

    const isPasswordCorrect = await bcrypt.compare(password, localAccount.password)
    if (!isPasswordCorrect) {
      return res.sendError(403, 'Incorrect credentials')
    }

    const authInfo = await appController.authorizeAccount({
      req, account_id: localAccount.account_id, app_id, ip,
    })

    res.send({
      ...authInfo,
      is_verified: localAccount.is_verified,
    })

    await onLoginEnd(req, { user_id: authInfo.user_id })
  })

export default app
