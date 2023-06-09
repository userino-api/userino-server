import express from 'express'
import { body } from 'express-validator'
import appController from '@controllers/appController'
import expressUtils from '@libs/express/expressUtils'
import middleWares from '@libs/middleWares'
import onLoginEnd from '../../../../hooks/onLoginEnd'
import firebaseController from '../../controllers/firebaseController'
import firebaseAccountModel from '../../models/firebaseAccountModel'
import firebaseUserModel from '../../models/firebaseUserModel'
import authUtils from '../../utils/authUtils'
import { RouterLocals } from './router'

const app = express.Router()

interface RouteBody {
  accessToken: string
  device: any
  localize: any
}

interface RouteResponse {
  token: string
  // user_id: string
  // is_eula_accepted: boolean
}

app.post<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, RouterLocals>('/login',
  body('accessToken').isLength({ min: 10, max: 2000 }), // ~1205 chars
  body('device').optional(),
  body('localize').optional(),
  middleWares.checkValidation,
  async (req, res) => {
    const { accessToken, device, localize } = req.body
    const { app_id } = req.session
    const ip = expressUtils.getClientIP(req) as string

    const { firebaseApp } = res.locals
    const authInstance = firebaseApp.auth()
    const decodedToken = await authInstance.verifyIdToken(accessToken)
    const firebaseUser = authUtils.decodeFirebaseToken(decodedToken)

    const {
      name, avatar_url, email, last_name, first_name, firebase_id, is_email_verified,
    } = firebaseUser

    // step 2 => check if user exists with such email or facebook_id
    const firebaseAccount = await firebaseAccountModel.get({ firebase_id })
    let account_id = firebaseAccount?.account_id

    // step 2.1 => create if not exists
    if (!firebaseAccount) {
      await firebaseUserModel.create({
        firebase_id,
        data: firebaseUser,
      })

      const account = await firebaseController.create({
        email,
        name,
        first_name,
        last_name,
        avatar_url,
      })
      account_id = account.account_id

      await firebaseAccountModel.create({
        firebase_id,
        account_id: account.account_id,
      })
    }

    const authInfo = await appController.authorizeAccount({
      req, app_id, account_id: account_id as string, ip,
    })

    res.send({
      ...authInfo,
    })

    await onLoginEnd(req, { user_id: authInfo.user_id })
  })

export default app
