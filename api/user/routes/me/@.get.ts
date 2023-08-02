import { Router } from 'express'
import usersModel from '@models/usersModel'

const router = Router()

router.get<{}, {}, {}>('/',
  async (req, res) => {
    const { account_id, appUser } = req.session

    const user = await usersModel.get(account_id)

    res.send({
      ...user,
      ...appUser,
    })
  })

export default router
