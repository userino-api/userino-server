import { Router } from 'express'
import router from './api/user/router'

const FirebasePlugin = {
  addRoutes(app:Router) {
    app.use('/firebase', router)
  },
}

export default FirebasePlugin
