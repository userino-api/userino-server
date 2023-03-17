import express from 'express'
import otpController from '../controllers/otpController'

const app = express.Router()

interface RouteBody {}

interface RouteResponse {
  otp_url: string
}

app.get<{}, RouteResponse | RouteErrorResponse, RouteBody>('/otp-url', async (req, res) => {
  const { app_id, user_id } = req.session

  const otp_url = await otpController.getUserOTPUrl({ user_id })

  res.send({
    otp_url,
  })
})

export default app
