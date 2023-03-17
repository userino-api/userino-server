import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import Joi from 'joi'

export default function createJoiValidator<T = any>(schema: Joi.ObjectSchema<T>): RequestHandler {
  return async function validateMiddleware(req, res, next) {
    try {
      const validated = await schema.validateAsync(req.body, { allowUnknown: true, stripUnknown: false })
      req.body = validated
      next()
    } catch (err: any) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500

      if (err.isJoi) return res.status(400).send({ errors: err.details })
      next(createHttpError(500))
    }
  }
}
