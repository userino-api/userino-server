import express from 'express'
import { plugins } from '../../../plugins/plugins'
import appRouter from './app/router'
import healthGet from './health.get'
// import userRouter from './user/router'

const app = express.Router()

app.use(healthGet)

app.use('/app', appRouter)
// app.use('/user', userRouter)

plugins.forEach(plugin => {
  const { route, routers } = plugin
  const pluginRouter = routers?.dashboard
  if (!pluginRouter) return null

  app.use(route, pluginRouter)
})

export default app
