import { Router } from 'express'
import { body } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import appUserModel, { AppUser } from '@models/appUserModel'
import tokensModel from '@models/tokensModel'

const app = Router()

type RouteBody = { token:string }
type RouteResponse = AppUser

app.post<{}, RouteResponse, RouteBody>('/check',
  body('token').isUUID(),
  checkValidation,
  async (req, res) => {
    const {
      token,
    } = req.body

    const tokenObj = await tokensModel.get(token)
    if (!tokenObj) return res.sendError(401, 'Not Authorized')

    // todo probably here we must check app_id scope
    const user = await appUserModel.get(tokenObj.user_id)
    if (!user) return res.sendError(501, 'User is broken')

    res.send(user)

    // todo to early for it
    // coreEventList.userRequest({ id: user.id })
  })

export default app
