import { getClientIP } from '@zvs001/express'
import { Router } from 'express'
import appController from '@controllers/appAuthController'
import { RouterLocals } from '../router'

const router = Router()

router.post<{}, {}, {}, {}, RouterLocals>('/login', async (req, res) => {
  const { organisationAdmin } = res.locals
  const { app_id } = req.session
  const ip = getClientIP(req) as string

  const data = await appController.authorizeAccount({
    req,
    app_id,
    account_id: organisationAdmin.organisation_id,
    ip,
  })

  res.send(data)
})

export default router
