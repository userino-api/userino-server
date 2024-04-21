import express from 'express'
import { plugins } from '../../../plugins/plugins'
import appRouter from './app/router'
import healthGet from './health.get'
import projectRouter from './project/router'
import userRouter from './user/router'
// import userRouter from './user/router'

const app = express.Router()

app.use(healthGet)

app.use('/app', appRouter)
app.use('/project', projectRouter)
app.use('/user', userRouter)

plugins.forEach(plugin => {
  const { route, routers } = plugin
  // @ts-ignore
  const pluginRouter = routers?.dashboard
  if (!pluginRouter) return null

  app.use(route, pluginRouter)
})

export default app
