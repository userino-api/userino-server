import serviceStartup from 'service-startup'
import adminRouter from './api/admin/router'
import dashboardRouter from './api/dashboard/router'
import userRouter from './api/user/server'
import config from './config/settings'
import createServer from './libs/express/createServer'
import './migrations/.config/auto'

const userServer = createServer()
userServer.use(userRouter)

const adminServer = createServer()
adminServer.use(adminRouter)

const dashboardServer = createServer()
dashboardServer.use(dashboardRouter)

// 404 Not found
// userServer.all('*', (req, res) => {
//   res.status(404).json({ error: 'Method not provided' })
// })

serviceStartup.start().then(() => {
  userServer.listen(config.ports.user, () => {
    console.log(`Listening port: ${config.ports.user}`)
  })

  dashboardServer.listen(config.ports.dashboard, () => {
    console.log(`Listening port: ${config.ports.dashboard}`)
  })

  adminServer.listen(config.ports.admin, () => {
    console.log(`Listening port: ${config.ports.admin}`)
  })
})
