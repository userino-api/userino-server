import bcrypt from 'bcrypt'
import express from 'express'
import { body } from 'express-validator'
import appController from '@controllers/appController'
import middleWares from '@libs/middleWares'
import createCustomIpRateLimiter from '@middlewares/rateLimits/createCustomIpRateLimiter'
import accountLocalModel from '@models/accountLocalModel'

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
    let {
      email, password, device, localize,
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

    // if (!user_id) {
    // todo here we can create app related user.
    // // link or create account
    //   const userAccount = await userAccountsModel.getByEmail({
    //     email,
    //     role: 'employee',
    //   })
    //   if (userAccount) {
    //   // todo (not sure) user account should be linked during creation probably.
    //     user_id = userAccount.user_id
    //     req.log('link to existing user account:', userAccount.user_id, email)
    //     await userAccountsModel.setLocalAuthId({
    //       user_id: userAccount.user_id,
    //       auth_local_id,
    //     })
    //   } else {
    //     req.log('create new user account:', email)
    //     const nameSplit = email.split('@')
    //     const name = nameSplit[0]
    //
    //     user_id = await userController.create({
    //       email,
    //       firebase_id: null,
    //     })
    //     await userAccountsModel.setLocalAuthId({
    //       user_id,
    //       auth_local_id,
    //     })
    //   }
    // }

    // step 3
    // const device_id = await deviceController.syncDevice(user_id, device, localize)

    // step 4 => Authorize user. Create new token for this user
    const tokens = await appController.authorizeAccount({ account_id: localAccount.account_id, app_id })

    res.send({
      ...tokens,
      is_verified: localAccount.is_verified,
    })
  })

export default app
