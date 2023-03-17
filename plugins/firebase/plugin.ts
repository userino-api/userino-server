import dashboardRouter from './api/dashboard/router'
import router from './api/user/router'

const FirebasePlugin = {
  name: 'firebase',
  route: '/firebase',
  routers: {
    user: router,
    admin: null,
    dashboard: dashboardRouter,
  },
}

export default FirebasePlugin
