import bcrypt from 'bcrypt'
import express from 'express'
import { body } from 'express-validator'
import middleWares from '@libs/middleWares'
import accountLocalModel from '@models/accountLocalModel'

const app = express.Router()

interface RouteBody {
  password: string
  password_new: string
}

app.post<{}, {}, RouteBody>('/change',
  body('password').isString().isLength({ min: 6 }),
  body('password_new').isString().isLength({ min: 6 }),
  middleWares.checkValidation,
  async (req, res) => {
    let { password_new, password } = req.body
    let { account_id } = req.session

    const account = await accountLocalModel.getByAccount({ account_id })
    if (!account) {
      return res.sendError(403, 'Password Account not found')
    }

    const isPasswordCorrect = await bcrypt.compare(password, account.password)
    if (!isPasswordCorrect) {
      return res.sendError(403, 'Invalid password')
    }

    await accountLocalModel.setPassword({ id: account.id, password: password_new })

    res.send({})
  })

export default app
