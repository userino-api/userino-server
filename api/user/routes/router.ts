import express from 'express'
import postMiddlewares from '@libs/express/expressPostMiddlewares'
import authMiddleWares from '@middlewares/authMiddleWares'
import { plugins } from '../../../plugins/plugins'
import appMiddleWare from '../middlewares/appMiddleWare'
import deviceRouter from './device/router'
import emailRouter from './email/router'
import healthGet from './health.get'
import localAuthRouter from './local/router'
import postLogout from './logout.post'
import meRouter from './me/router'

const app = express.Router()
app.use(healthGet)

app.use(appMiddleWare.createAppMiddleware())
// app.use(postLogin)

app.use('/local', localAuthRouter)
app.use('/email', emailRouter)

// plugins might need public scope
plugins.forEach(plugin => {
  const { route, routers } = plugin
  const pluginRouter = routers?.user
  if (!pluginRouter) return null

  app.use(route, pluginRouter)
})

app.use(localAuthRouter)

app.use(authMiddleWares.checkAuthCore)
// app.use(saveOnline)
app.use('/me', meRouter)
app.use([
  postLogout,
])

app.use('/device', deviceRouter)

app.use(postMiddlewares)

export default app
