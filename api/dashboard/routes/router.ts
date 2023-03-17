import express from 'express'
import { plugins } from '../../../plugins/plugins'
import appRouter from './app/router'
import userRouter from './user/router'

const app = express.Router()

app.all('/ping', (req, res) => res.send('PONG'))

app.use('/app', appRouter)
app.use('/user', userRouter)

plugins.forEach(plugin => {
  const { route, routers } = plugin
  const pluginRouter = routers?.dashboard
  if (!pluginRouter) return null

  app.use(route, pluginRouter)
})

export default app
