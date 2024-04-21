import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { body } from 'express-validator'
import issueModel, { Issue } from '@models/issues/issueModel'
import { RouterLocals } from '../router'

const app = Router()

type RouteBody = {
  status: Issue['status']
}

app.post<{}, {}, RouteBody, {}, RouterLocals>('/status',
  body('status').isIn(['resolved', 'closed', 'opened']),
  checkValidator,
  async (req, res) => {
    const { status } = req.body
    const { issue } = res.locals

    await issueModel.setStatus({ id: issue.id, status })

    res.send()
  })

export default app
