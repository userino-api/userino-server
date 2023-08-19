import request, { SuperTest, Test } from 'supertest'
import createServer from '@libs/express/createServer'
import userRouter from '../routes/router'

const server = createServer()
server.use(userRouter)

const testServer: SuperTest<Test> = request(server)

export default testServer
