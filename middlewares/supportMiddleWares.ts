import compareVersion from 'compare-versions'
import express from 'express'
import _ from 'lodash'

function supportVersionsBefore(version: string, handler: express.Handler) {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const appVersion: string = req.headers['app-version'] as string

    if (!appVersion) return next()

    const diff = compareVersion(appVersion, version)

    if (diff < 0) return handler(req, res, next)
    next()
  }
}

export default {
  supportVersionsBefore,
}
