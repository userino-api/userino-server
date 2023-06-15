import adminRouter from './api/admin/router'
import dashboardRouter from './api/dashboard/router'
import router from './api/user/router'

const FirebasePlugin = {
  name: 'firebase',
  route: '/firebase',
  routers: {
    user: router,
    admin: adminRouter,
    dashboard: dashboardRouter,
  },
}

export default FirebasePlugin
