import { Router } from 'express'
import { body } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import mediaAppConfigModel from '../../../../models/mediaAppConfigModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
  client_id: string
  client_secret: string
}

router.post<{}, {}, RouteBody, {}, RouteLocals>('/config',
  body('client_id').isUUID(),
  body('client_secret').isString(),
  checkValidation,
  async (req, res) => {
    const { client_id, client_secret } = req.body
    const { project } = res.locals

    const configExists = await mediaAppConfigModel.get({ project_id: project.id })
    if (configExists) {
      await mediaAppConfigModel.setCredentials({ project_id: project.id, client_id, client_secret })
    } else {
      await mediaAppConfigModel.create({ project_id: project.id, client_id, client_secret })
    }

    res.send()
  },
)

export default router
