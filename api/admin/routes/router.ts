import licenceExpress from '@octoguild-licence/express'
import express from 'express'
import config from '../../../config/settings'
import authRouter from './auth/router'
import healthGet from './health.get'
import userRouter from './user/router'
import verifyPost from './verify.post'

if (config.licence) {
  // eslint-disable-next-line global-require
  require('../../../libs/licenceSocket')
}

const app = express.Router()
app.use(healthGet)

if (config.licence) {
  app.use(licenceExpress.createAccessMiddleWare({
    onSuccess(params): any {
      const {
        req, data, client_id,
      } = params
      const { app_ref } = data || {}
      // @ts-ignore
      req.session = { app_id: app_ref }
    },
  }))
}

app.use([
  verifyPost,
])
app.use('/auth', authRouter)
app.use('/user', userRouter)

export default app
