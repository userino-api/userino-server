import licenceClient from '@octoguild-licence/client'
import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { body } from 'express-validator'
import { RouterLocals } from '../../router'

const router = Router()

type RouteBody = { client_id: string }
type RouteResponse = {}

router.post<{}, RouteResponse, RouteBody, {}, RouterLocals>('/delete',
  body('client_id').isString(),
  checkValidator,
  (req, res) => {
    const { app } = res.locals
    const { client_id } = req.body

    licenceClient.deleteClient({ client_id, app_ref: app.id }, () => {
      res.send()
    })
  })

export default router
