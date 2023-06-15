import { plugins } from '../../plugins/plugins'
import router from './routes/router'

plugins.forEach(plugin => {
  const { route, routers } = plugin
  const pluginRouter = routers?.admin
  if (!pluginRouter) return null

  router.use(route, pluginRouter)
})

export default router
