import { Router } from 'express'
import issueModel from '@models/issues/issueModel'
import { RouterLocals } from '../router'

const app = Router()

app.get<{}, {}, {}, {}, RouterLocals>('/',
  async (req, res) => {
    const { issue } = res.locals

    const issueFull = await issueModel.getForUser(issue.id)

    res.send(issueFull)
  })

export default app
