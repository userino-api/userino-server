import { Router } from 'express'
import appModel from '@models/appModel'

const router = Router()

router.post('/verify', async (req, res) => {
  const { app_id } = req.session || {}

  // no way to get app name?
  if (!app_id) return res.send()

  const app = await appModel.get(app_id)

  res.send({
    app,
  })
})

export default router
