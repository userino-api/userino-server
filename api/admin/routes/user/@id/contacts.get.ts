import { Router } from 'express'
import userContactsModel, { AccountContacts } from '@models/userContactsModel'
import { RouterLocals } from '../router'

const app = Router()

type RouteBody = { }
type RouteResponse = AccountContacts | null

app.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/contacts',
  async (req, res) => {
    const { user } = res.locals

    const contacts = await userContactsModel.get({ account_id: user.id })

    res.send(contacts)
  })

export default app
