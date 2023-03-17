import { Router } from 'express'
import otpUrlGet from './otp-url.get'
import otpVerify from './otp-verify.post'

const app = Router()

app.use([
  otpUrlGet,
  otpVerify,
])

export default app
