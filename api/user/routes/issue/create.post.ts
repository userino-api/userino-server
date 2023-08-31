import express from 'express'
import issueModel from '@models/issues/issueModel'

interface RouteBody {
  text: string
  data: Record<string, any>
}

const app = express.Router()

app.post<{}, {}, RouteBody, {}>('/create', async (req, res) => {
  const { account_id, appUser, app_id } = req.session
  const { text, data } = req.body

  const id = await issueModel.create({
    text,
    data,
    app_id,
    app_user_id: appUser.id,
  })

  res.send({
    id,
  })
})

export default app
