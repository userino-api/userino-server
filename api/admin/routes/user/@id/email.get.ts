import { Router } from 'express'
import userContactsModel from '@models/userContactsModel'
import { RouterLocals } from '../router'

const app = Router()

type RouteBody = { }
type RouteResponse = { email:string; is_email_verified: boolean }

app.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/email',
  async (req, res) => {
    const { user, appUser } = res.locals

    const contacts = await userContactsModel.get({ account_id: user.id })
    if (!contacts?.email) return res.sendError(404, 'Not Found')

    res.send({
      email: contacts.email,
      is_email_verified: contacts.is_email_verified,
    })
  })

export default app
