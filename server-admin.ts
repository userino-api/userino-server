import serviceStartup from 'service-startup'
import adminServer from './api/admin/router'
import config from './config/settings'
import app from './libs/express/expressRouter'

app.use('/admin', adminServer)

// 404 Not found
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Method not provided' })
})

serviceStartup.start().then(() => {
  const port = config.ports.admin
  app.listen(port, () => {
    console.log(`Listening port: ${port}`)
  })
})

export default app
