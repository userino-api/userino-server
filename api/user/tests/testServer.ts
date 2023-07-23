import express from 'express'
import request, { SuperTest, Test } from 'supertest'
import expressGlobalMiddlewares from '../../../libs/express/expressGlobalMiddlewares'
import userRouter from '../routes/router'

const server = express()
server.use(expressGlobalMiddlewares)
server.use(userRouter)

const testServer: SuperTest<Test> = request(server)

export default testServer
