import express from 'express'
import tokensModel from '@models/tokensModel'

const app = express.Router()

/**
 * @api {post} /employee/logout Logout
 * @apiName EmployeeLogout
 * @apiGroup Employee
 * @apiDescription Logout
 * @apiPermission employee
 *
 * @apiHeader {String} Authorization Authorization token
 */
app.post('/logout', async (req, res) => {
  const { app_id, user_id } = req.session

  await tokensModel.deleteByUser(user_id)

  res.status(200).send({ success: true })
})

export default app
