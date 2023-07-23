import { Router } from 'express'
import { body } from 'express-validator'
import userController from '@controllers/userController'
import LogicError from '@libs/LogicError'
import { checkValidation } from '@libs/middleWares'
import usersModel from '@models/usersModel'
import userErrorCodes from '../../../../const/userErrorCodes'

type RouteBody = { username: string }

const router = Router()

router.post<{}, {}, RouteBody>('/username', body('username').isString().isLength({ min: 3, max: 50 }), checkValidation, async (req, res) => {
  const { username } = req.body
  const { account_id } = req.session

  const userExists = await usersModel.getByUserName(username)
  if (userExists) {
    return res.sendError(new LogicError({ httpStatus: 409, message: 'Username is already taken', errorCode: userErrorCodes.usernameIsTaken }))
  }

  const changed = await userController.setUserName({ account_id, username })

  res.send({ changed })
})

export default router
