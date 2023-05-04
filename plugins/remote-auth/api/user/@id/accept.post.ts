import express from 'express'
import remoteAuthSessionModel from '../../../models/remoteAuthSessionModel'
import { RouterLocals } from '../router'

const app = express.Router()

interface RouteBody {}

interface RouteResponse {}

app.post<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, RouterLocals>('/accept', async (req, res) => {
  const { remoteSession } = res.locals

  await remoteAuthSessionModel.approve({ id: remoteSession.id })

  res.send()
})

export default app
