import express from 'express'
import request, { SuperTest, Test } from 'supertest'
import expressGlobalMiddlewares from '../../../libs/express/expressGlobalMiddlewares'
import adminRouter from '../router'

const server = express()
server.use(expressGlobalMiddlewares)
server.use(adminRouter)

const testServer: SuperTest<Test> = request(server)

export default testServer
