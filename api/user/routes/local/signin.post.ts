import express from 'express'
import { body } from 'express-validator'
import emailWhiteList from '@libs/emailWhiteList'
import middleWares from '@libs/middleWares'
import createCustomIpRateLimiter from '@middlewares/rateLimits/createCustomIpRateLimiter'
import accountLocalModel from '@models/accountLocalModel'
import authErrorCodes from '../../../../const/authErrorCodes'
import authLocalController from './controllers/authLocalController'

const app = express.Router()

app.post('/signin',
  createCustomIpRateLimiter({
    key: 'local-signin-anti-brute', max: 3, timeWindowSeconds: 60 * 60, skipFailedRequests: true,
  }),
  body('email').isEmail().toLowerCase(),
  body('password').isString().isLength({ min: 6 }),
  middleWares.checkValidation,
  async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()

    if (!emailWhiteList.isOk(email)) {
      return res.sendError(403, 'Email is not allowed', authErrorCodes.emailBlocked)
    }

    const localAccount = await accountLocalModel.getByEmail({ email })
    if (localAccount) {
      return res.sendError(409, 'Account already exists')
    }

    const auth_id: string = await authLocalController.createAccount({
      email,
      password,
    })

    // todo authorize?
    // await verificationController.createAccountVerification({ email })

    res.send({})
  })

export default app
