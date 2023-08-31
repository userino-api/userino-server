import express from 'express'
import issueModel from '@models/issues/issueModel'

interface RouteBody {}

const app = express.Router()

app.get<{}, {}, {}, {}>('/list', async (req, res) => {
  const { appUser } = req.session

  const list = await issueModel.getByUser(appUser.id)

  res.send({
    list,
  })
})

export default app
