import { Router } from 'express'
import configAuthController from '@controllers/configAuthController'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
}

router.post<{}, {}, RouteBody, {}, RouteLocals>('/disable', async (req, res) => {
  const { app } = res.locals

  await configAuthController.disableAuth({
    key: 'firebase',
    app_id: app.id,
  })

  res.send()
})

export default router
