import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  res.send({
    status: true,
  })
})

export default router
