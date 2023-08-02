import { Router } from 'express'
import { body } from 'express-validator'
import userController from '@controllers/userController'
import { checkValidation } from '@libs/middleWares'

type RouteBody = { name: string }

const router = Router()

router.post<{}, {}, RouteBody>('/name',
  body('name').isString().isLength({ min: 3, max: 50 }),
  checkValidation,
  async (req, res) => {
    const { name } = req.body
    const { account_id, appUser } = req.session

    const changed = await userController.setName({ account_id, name, id: appUser.id })

    res.send({ changed })
  })

export default router
