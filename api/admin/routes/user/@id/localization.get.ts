import { Router } from 'express'
import userLocalizationModel, { UserLocalization } from '@models/userLocalizationModel'
import { RouterLocals } from '../router'

const app = Router()

type RouteBody = { }
type RouteResponse = UserLocalization | null

app.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/localization',
  async (req, res) => {
    const { user } = res.locals

    const localization = await userLocalizationModel.get({ account_id:  user.id })

    res.send(localization)
  })

export default app
