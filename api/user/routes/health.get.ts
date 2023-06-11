import { Router } from 'express'
import packageJson from '../../../package.json'

const router = Router()

router.get('/health', (req, res) => {
  res.send({
    server: 'user',
    status: true,
    version: packageJson.version,
  })
})

export default router
