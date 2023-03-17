import express from 'express'
import request, { SuperTest, Test } from 'supertest'
import expressGlobalMiddlewares from '../../../libs/express/expressGlobalMiddlewares'
import employeeRouter from '../routes/router'

const server = express()
server.use(expressGlobalMiddlewares)
server.use(employeeRouter)

const testServer: SuperTest<Test> = request(server)

export default testServer
