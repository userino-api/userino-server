import { Response, NextFunction } from 'express'
import invariant from 'invariant'
import _ from 'lodash'
import { validate } from 'uuid'
import appUserModel from '@models/appUserModel'
import tokensModel from '@models/tokensModel'
import { RequestCore } from '../typings/express'

/**
 * Check auth token
 * @param req Request
 * @param res Response
 * @param next Callback
 */
async function checkAuthCore(req: RequestCore, res: Response, next: NextFunction): Promise<any> {
  invariant(!req.isAuthChecked, 'checkAuthCore is called multiple times')
  const authorization = req.headers.authorization || ''
  if (_.isEmpty(authorization)) return res.sendError(401, 'Token required')

  let splitRes = authorization.split(' ')
  const token: string = splitRes.length > 1 ? splitRes[1] : splitRes[0]
  if (!validate(token)) {
    return res.sendError(403, 'Token is invalid')
  }

  const tokenObj = await tokensModel.get(token)
  if (_.isEmpty(tokenObj)) return res.sendError(401, 'Token is not authorized')
  const { user_id, device_id, session: tokenSession } = tokenObj

  const appUser = await appUserModel.get(user_id)

  const reqSession: any = {
    ...req.session,
    user_id: appUser?.id,
    account_id: appUser?.account_id,
    app_id: appUser?.app_id,
    appUser,
    ...tokenSession,
  }

  req.session = reqSession

  req.isAuthChecked = true
  next()
}

// function createRoleCheck(role: string | string[]) {
//   const roles = _.isArray(role) ? role : [role]
//
//   return function (req: RequestCore, res: Response, next: NextFunction) {
//     const userRole = req.session.role
//     if (roles.includes(userRole)) return next()
//
//     res.status(403).send({ error: `Your role is ${userRole}. Api works only for: ${roles.join(' ')}` })
//   }
// }

export default {
  checkAuthCore,
  userAuthIsRequired: checkAuthCore,
  // createRoleCheck,
}
