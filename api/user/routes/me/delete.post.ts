import { Router } from 'express'
import userController from '@controllers/userController'

type RouteBody = { }

const router = Router()

router.post<{}, {}, RouteBody>('/delete',
  async (req, res) => {
    const { appUser } = req.session

    const changed = await userController.deleteUser({ id: appUser.id })

    res.send({ changed })
  })

export default router
