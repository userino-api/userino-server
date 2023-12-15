import { Router } from 'express'
import { body } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import projectModel, { Project } from '@models/projectModel'
import { RouterLocals } from './router'

const router = Router()

type RouteBody = { name: string }
type RouteResponse = Project

router.post<{}, RouteResponse, RouteBody, {}, RouterLocals>('/create',
  body('name').isString(),
  checkValidation,
  async (req, res) => {
    const { name } = req.body

    const id = await projectModel.create({
      name,
    })

    const project = await projectModel.get(id)

    res.send(project as Project)
  })

export default router
