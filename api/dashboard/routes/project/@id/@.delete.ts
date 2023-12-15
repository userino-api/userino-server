import { Router } from 'express'
import projectController from '@controllers/projectController'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = {}

router.delete<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { project } = res.locals

    await projectController.deleteProject({ project_id: project.id })

    res.send()
  })

export default router
