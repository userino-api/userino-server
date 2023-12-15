import { Router } from 'express'
import configAuthController from '@controllers/configAuthController'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
}

router.post<{}, {}, RouteBody, {}, RouteLocals>('/disable', async (req, res) => {
  const { project } = res.locals

  await configAuthController.disableAuth({
    key: 'media',
    project_id: project.id,
  })

  res.send()
})

export default router
