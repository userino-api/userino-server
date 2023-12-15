import { expect } from 'chai'
import { v4 } from 'uuid'
import agent from '../../../tests/testServer'

describe('/dashboard:/project/create [POST]', () => {
  it('it works', async () => {
    const { status, body } = await agent.post('/project/create').send({
      name: v4(),
    })

    expect(status).to.equals(200)
  })
})
