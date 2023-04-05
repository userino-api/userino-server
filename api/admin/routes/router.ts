import licenceExpress from '@octoguild-licence/express'
import express from 'express'
import config from '../../../config/settings'
import healthGet from '../../shared/routes/health.get'
import authRouter from './auth/router'
import userRouter from './user/router'

if (config.licence) {
  // eslint-disable-next-line global-require
  require('../../../libs/licenceSocket')
}

const app = express.Router()
app.use(healthGet)

if (config.licence) {
  app.use(licenceExpress.createAccessMiddleWare())
}

app.use('/auth', authRouter)
app.use('/user', userRouter)

export default app
