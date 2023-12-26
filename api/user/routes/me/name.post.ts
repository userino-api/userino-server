import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { body } from 'express-validator'
import userController from '@controllers/userController'

type RouteBody = { name: string }

const router = Router()

router.post<{}, {}, RouteBody>('/name',
  body('name').isString().isLength({ min: 3, max: 50 }),
  checkValidator,
  async (req, res) => {
    const { name } = req.body
    const { account_id, appUser } = req.session

    const changed = await userController.setName({ account_id, name, id: appUser.id })

    res.send({ changed })
  })

export default router
