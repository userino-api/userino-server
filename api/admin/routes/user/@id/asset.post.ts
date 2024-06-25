import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { body } from 'express-validator'
import userController from '@controllers/userController'
import connectMediaAppMiddleware, { RouterLocals as MiddleWareLocals } from '../../../../../plugins/media/middlewares/connectMediaAppMiddleware'
import { RouterLocals } from '../router'

type RouteBody = { asset_id: string }

const router = Router()

router.post<{}, {}, RouteBody, {}, RouterLocals & MiddleWareLocals>('/asset',
  body('asset_id').isString().isLength({ min: 10, max: 50 }),
  checkValidator,
  connectMediaAppMiddleware,
  async (req, res) => {
    const { asset_id } = req.body
    const { mediaClient, appUser } = res.locals

    const asset = await mediaClient.assets.getAsset(asset_id)
    if (!asset) return res.sendError(400, 'Invalid asset')

    req.log('set avatar', asset)

    const changed = await userController.setAvatar({
      account_id: appUser.account_id, id: appUser.id, asset_id, avatar_url: asset.original?.url,
    })

    res.send({ changed })
  })

export default router
