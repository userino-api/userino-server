import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { body } from 'express-validator'
import userController from '@controllers/userController'
import connectMediaAppMiddleware, { RouterLocals } from '../../../../plugins/media/middlewares/connectMediaAppMiddleware'

type RouteBody = { asset_id: string }

const router = Router()

router.post<{}, {}, RouteBody, {}, RouterLocals>('/asset',
  body('asset_id').isString().isLength({ min: 10, max: 50 }),
  checkValidator,
  connectMediaAppMiddleware,
  async (req, res) => {
    const { appUser } = req.session
    const { asset_id } = req.body
    const { mediaClient } = res.locals

    const asset = await mediaClient.assets.getAsset(asset_id)
    if (!asset) return res.sendError(400, 'Invalid asset')

    req.log('set avatar', asset)

    const changed = await userController.setAvatar({
      account_id: appUser.account_id, id: appUser.id, asset_id, avatar_url: asset.original?.url,
    })

    res.send({ changed })
  })

export default router
