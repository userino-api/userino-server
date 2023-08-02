import { Router } from 'express'
import usersModel from '@models/usersModel'
import { RouterLocals } from '../router'

const router = Router()

router.get<{}, {}, {}, {}, RouterLocals>('/',
  async (req, res) => {
    const { appUser } = res.locals

    const user = await usersModel.get(appUser.account_id)

    res.send({
      ...user,
      ...appUser,
    })
  })

export default router
