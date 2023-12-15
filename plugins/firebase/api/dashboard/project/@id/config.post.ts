import { Router } from 'express'
import { body } from 'express-validator'
import _ from 'lodash'
import { checkValidation } from '@libs/middleWares'
import firebaseAppConfigModel from '../../../../models/firebaseAppConfigModel'
import { RouteLocals } from '../router'

const router = Router()

interface RouteBody {
  fileRaw: Record<string, any>
}

router.post<{}, {}, RouteBody, {}, RouteLocals>('/config',
  body('fileRaw').isJSON({ }),
  checkValidation,
  async (req, res) => {
    const { fileRaw } = req.body
    const { project } = res.locals

    const file = _.isString(fileRaw) ? JSON.parse(fileRaw) : fileRaw
    if (file.type !== 'service_account') {
      return res.sendError(400, 'Seems you are trying to send wrong config.')
    }

    const configExists = await firebaseAppConfigModel.get({ project_id: project.id })
    if (configExists) {
      await firebaseAppConfigModel.setConfig({ project_id: project.id, config: fileRaw })
    } else {
      await firebaseAppConfigModel.create({ project_id: project.id, config: fileRaw })
    }

    res.send()
  },
)

export default router
