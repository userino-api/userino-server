import express from 'express'
import { body } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import otpController from '../controllers/otpController'

const app = express.Router()

interface RouteBody {
  token: string
}

interface RouteResponse {
  isVerified: boolean
}

app.post<{}, RouteResponse | RouteErrorResponse, RouteBody>('/otp-verify',
  body('token').isString().isLength({ min: 6, max: 6 }),
  checkValidation,
  async (req, res) => {
    const { app_id, user_id } = req.session
    const { token } = req.body

    const isVerified = await otpController.verifyUser({ user_id, token })

    res.send({
      isVerified: isVerified || false,
    })
  })

export default app
