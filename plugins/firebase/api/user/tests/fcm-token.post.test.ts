import { expect } from 'chai'
import appsModel from '@models/appsModel'
import agent from '../../../../../api/user/tests/testServer'
import testUtil, { TestUser } from '../../../../../test/helpers/testUtil'
import firebaseAppConfigModel from '../../../models/firebaseAppConfigModel'
import firebaseFcmTokenModel from '../../../models/firebaseFcmTokenModel'

const FCMToken = 'xxxqweqweqweqweqweqweqweqweqweqweqwexxxqweqweqweqweqweqweqweqweqweqweqwexxxqweqweqweqweqweqweqweqweq'
describe('/firebase/fcm-token [POST]', () => {
  let user: TestUser

  before(async () => {
    const defaultApp = await appsModel.getPrimaryApp()
    user = await testUtil.createUser()
    await firebaseAppConfigModel.create({
      project_id: defaultApp.project_id,
      config: {
        type: 'service_account',
        project_id: 'test',
        private_key_id: 'id',
        private_key: 'private',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-au782%40octoex.iam.gserviceaccount.com',
      },
    })
  })

  it('token was set', async () => {
    const { status, body } = await agent.post('/firebase/fcm-token').set('authorization', user.token).send({ token: FCMToken })
    expect(status).to.equals(200)

    let tokens = await firebaseFcmTokenModel.getByUser(user)
    expect(tokens.length).to.equal(1)
    expect(tokens[0].token).to.equal(FCMToken)
  })
})
