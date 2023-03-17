import { validationResult } from 'express-validator'

export function checkValidation(req, res, next) {
  const validation = validationResult(req)
  if (validation.isEmpty()) return next()

  return res.sendError(400, {
    validator: validation.array(),
    error: 'Validation Error',
  })
}

export default {
  checkValidation,
}
