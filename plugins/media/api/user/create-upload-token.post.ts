import express from 'express'
import middleWares from '@libs/middleWares'
import { RouterLocals } from './router'

const app = express.Router()

interface RouteBody {
  token: string
}

interface RouteResponse {}

app.post<{}, RouteResponse | RouteErrorResponse, RouteBody, {}, RouterLocals>('/create-upload-token', middleWares.checkValidation, async (req, res) => {
  const { token } = req.body
  const { mediaClient } = res.locals

  try {
    const data = await mediaClient.client.createClientToken()
    return res.send(data)
  } catch (e) {
    const { status, data } = e?.response
    return res.status(status).send(data)
  }
})

export default app
