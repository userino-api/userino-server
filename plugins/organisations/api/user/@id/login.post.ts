import { getClientIP } from '@zvs001/express'
import { Router } from 'express'
import appController from '@controllers/appAuthController'
import { RouterLocals } from '../router'

const router = Router()

router.post<{}, {}, {}, {}, RouterLocals>('/login', async (req, res) => {
  const { organisationAdmin } = res.locals
  const ip = getClientIP(req) as string

  const data = await appController.authorize({
    user_id: organisationAdmin.organisation_id,
    ip,
  })

  res.send(data)
})

export default router
