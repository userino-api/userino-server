import express from 'express'
import { body } from 'express-validator'
import generator from 'generate-password'
import middleWares from '@libs/middleWares'
import accountLocalModel from '@models/accountLocalModel'

const app = express.Router()

app.post('/reset',
  body('email').isEmail(),
  middleWares.checkValidation,
  async (req, res) => {
    let { email } = req.body

    const account = await accountLocalModel.getByEmail({ email })
    if (!account) {
      return res.sendError(403, 'Password Account not found')
    }

    const password_new = generator.generate({
      length: 8,
      numbers: true,
    })

    req.log('email for resetting account is not implemented')
    // await emailController.sendResetPasswordEmail({
    //   password: password_new,
    //   email,
    // })

    const changed = await accountLocalModel.setPasswordByEmail({ email, password: password_new })
    req.log('password is reset for', email, ' changed:', changed)

    res.send({ changed })
  })

export default app
