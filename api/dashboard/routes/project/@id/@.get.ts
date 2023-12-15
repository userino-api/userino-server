import { Router } from 'express'
import { Project } from '@models/projectModel'
import { RouterLocals } from '../router'

const router = Router()

type RouteBody = { }
type RouteResponse = Project

router.get<{}, RouteResponse, RouteBody, {}, RouterLocals>('/',
  async (req, res) => {
    const { project } = res.locals

    res.send(project)
  })

export default router
