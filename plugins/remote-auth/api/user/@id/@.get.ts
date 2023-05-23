import express from 'express'
import { RouterLocals } from '../router'

const app = express.Router()

interface RouteBody {}

interface RouteResponse {}

app.get<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, RouterLocals>('/', async (req, res) => {
  const { remoteSession } = res.locals
  const { user_id } = req.session

  res.send(remoteSession)
})

export default app
