import express from 'express'
import accountLocalModel from '@models/accountLocalModel'

const app = express.Router()

app.post<{}, {}, {}, {}>('/check', async (req, res) => {
  const { account_id } = req.session

  const account = await accountLocalModel.getByAccount({ account_id })

  res.send({
    is_verified: account?.is_verified || false,
  })
})

export default app
