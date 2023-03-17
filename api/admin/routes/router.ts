import licenceExpress from '@octoguild-licence/express'
import express from 'express'
import authRouter from './auth/router'
import userRouter from './user/router'

import '../../../libs/licenceSocket' // configure

const app = express.Router()

app.use(licenceExpress.createAccessMiddleWare())

app.all('/ping', (req, res) => res.send('PONG'))

app.use('/auth', authRouter)
app.use('/user', userRouter)

export default app
