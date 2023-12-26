import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { body } from 'express-validator'
import userController from '@controllers/userController'
import LogicError from '@libs/LogicError'
import userModel from '@models/userModel'
import userErrorCodes from '../../../../const/userErrorCodes'

type RouteBody = { username: string }

const router = Router()

router.post<{}, {}, RouteBody>('/username',
  body('username').isString().isLength({ min: 3, max: 50 }).toLowerCase(),
  checkValidator,
  async (req, res) => {
    const { username } = req.body
    const { account_id, appUser } = req.session

    const userExists = await userModel.getByUserName(username)
    if (userExists) {
      return res.sendError(new LogicError({ httpStatus: 409, message: 'Username is already taken', errorCode: userErrorCodes.usernameIsTaken }))
    }

    const changed = await userController.setUserName({ account_id, username, id: appUser.id })

    res.send({ changed })
  })

export default router
