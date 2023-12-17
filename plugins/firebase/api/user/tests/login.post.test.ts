import { expect } from 'chai'
// import devicesModel from '@models/devicesModel'
import appUserModel from '@models/appUserModel'
import appsModel from '@models/appModel'
import tokensModel from '@models/tokensModel'
import usersModel from '@models/usersModel'
import agent from '../../../../../api/user/tests/testServer'
import firebaseAccountModel from '../../../models/firebaseAccountModel'
import firebaseAppConfigModel from '../../../models/firebaseAppConfigModel'
import { FIREBASE_TOKEN, FIREBASE_TOKEN_NO_NAME, decodedToken } from '../../../tests/stubs/firebaseStub'

describe('/firebase/login [POST]', () => {
  // let device1: UserDevice
  // let device2: UserDevice
  let account_id: string

  before(async () => {
    const defaultApp = await appsModel.getPrimaryApp()
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

  it('login first try', async () => {
    const { status, body } = await agent.post('/firebase/login').send({ accessToken: FIREBASE_TOKEN })
    expect(status).to.equals(200)
    expect(body).to.have.property('token')
    const { token } = body

    let tokenObj = await tokensModel.get(token)
    expect(tokenObj).to.have.property('user_id')
    // expect(tokenObj.device_id).to.equal(device1.device_id)
    const { user_id } = tokenObj

    let appUser = await appUserModel.get(user_id)
    expect(appUser).to.have.property('id')
    account_id = appUser?.account_id as string

    const firebaseAccount = await firebaseAccountModel.getByAccount({ account_id })
    expect(firebaseAccount).to.deep.include({
      firebase_id: decodedToken.uid,
    })
    // let devices = await devicesModel.getByUser({ user_id: employeeId })
    // expect(devices.length).to.equal(1)
    // expect(devices[0].device_id).to.equal(device1.device_id)
  })

  it('login second try', async () => {
    const { status, body } = await agent.post('/firebase/login').send({ accessToken: FIREBASE_TOKEN })
    expect(status).to.equals(200)
    expect(body).to.have.property('token')
    const { token } = body

    let tokenObj = await tokensModel.get(token)
    expect(tokenObj).to.have.property('user_id')
    const { user_id } = tokenObj

    let appUser = await appUserModel.get(user_id)
    expect(appUser).to.deep.include({
      account_id,
    })
  })

  // it('login third try [with different device]', async () => {
  //   const { status, body } = await agent.post('/login').send({ accessToken: FIREBASE_TOKEN, device: device2 })
  //   expect(status).to.equals(200)
  //   const { token } = body
  //
  //   let tokenObj = await tokensModel.get(token)
  //   const { user_id } = tokenObj
  //   expect(employeeId).to.equal(user_id)
  //
  //   let devices = await devicesModel.getByUser({ user_id })
  //   expect(devices.length).to.equal(2)
  // })

  it('create with empty name', async () => {
    const { status, body } = await agent.post('/firebase/login').send({ accessToken: FIREBASE_TOKEN_NO_NAME })
    expect(status).to.equal(200)
    expect(body.token).is.a('string')

    const tokenObj = await tokensModel.get(body.token)
    const appUser = await appUserModel.get(tokenObj.user_id)
    expect(appUser?.account_id).to.not.eq(account_id)

    const user = await usersModel.get(appUser?.account_id as string)
    expect(user).to.deep.include({
      name: 'No Name',
      first_name: 'No',
      last_name: 'Name',
    })
  })

  // it('localization works', async () => {
  //   const { status, body } = await agent.post('/login').send({ accessToken: FIREBASE_TOKEN_NO_NAME, device: device2, localize: device1.localization })
  //   expect(status).to.equal(200)
  //   await testUtil.wait(200)
  //
  //   const userConfig = await userConfigModel.get(body.user_id)
  //   expect(userConfig).to.deep.include({
  //     locale: 'UA',
  //     locale_list: [
  //       'uk-UA',
  //     ],
  //     time_zone: 'Europe/Kiev',
  //     event_languages: ['en', 'uk'],
  //   })
  // })
})
