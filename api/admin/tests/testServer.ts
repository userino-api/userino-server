import request, { SuperTest, Test } from 'supertest'
import createServer from '@libs/express/createServer'
import adminRouter from '../router'

const server = createServer()
server.use(adminRouter)

const testServer: SuperTest<Test> = request(server)

export default testServer
