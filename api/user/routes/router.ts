import express from 'express'
import authMiddleWares from '@middlewares/authMiddleWares'
import plugins from '../../../plugins/plugins'
import appMiddleWare from '../middlewares/appMiddleWare'
import emailRouter from './email/router'
import localAuthRouter from './local/router'
import postLogout from './logout.post'

const app = express.Router()

app.use(appMiddleWare.createAppMiddleware())
// app.use(postLogin)

app.use('/local', localAuthRouter)
app.use('/email', emailRouter)

// plugins might need public scope
plugins.addRoutes(app)

app.use(localAuthRouter)

app.use(authMiddleWares.checkAuthCore)
// app.use(saveOnline)
app.use([
  postLogout,
])

export default app
