// import dashboardRouter from './api/dashboard/router'
import router from './api/user/router'

const RemoteAuthPlugin = {
  name: 'remote-auth',
  route: '/remote',
  routers: {
    user: router,
    admin: null,
    // dashboard: dashboardRouter,
  },
}

export default RemoteAuthPlugin
