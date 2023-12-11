import adminRouter from './api/admin/router'
import dashboardRouter from './api/dashboard/router'
import router from './api/user/router'

const MediaPlugin = {
  name: 'organisations',
  route: '/organisation',
  routers: {
    user: router,
    admin: adminRouter,
    dashboard: dashboardRouter,
  },
}

export default MediaPlugin
