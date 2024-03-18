import { Router } from 'express'

const router = Router()

router.post('/verify', (req, res) => {
  // const { app } = req.session || {}

  // no way to get app name?

  res.send({})
})

export default router
