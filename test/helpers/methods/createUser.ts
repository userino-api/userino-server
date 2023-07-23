import randomstring from 'randomstring'
import { v4 as uuid } from 'uuid'
import accountLocalModel from '@models/accountLocalModel'
import accountModel from '@models/accountModel'
import appUserModel from '@models/appUserModel'
import appsModel from '@models/appsModel'
import deviceMobileModel from '@models/devices/deviceMobileModel'
import deviceUserMobileModel from '@models/devices/deviceUserMobileModel'
import tokensModel from '@models/tokensModel'
import userContactsModel from '@models/userContactsModel'
import usersModel from '@models/usersModel'

export class TestUser {
  account_id: string

  id: string

  user_id: string

  token:string

  email: string

  username: string

  constructor(params: {
    account_id: string
    user_id: string
    token: string
    email: string
    username: string
}) {
    this.account_id = params.account_id
    this.user_id = params.user_id
    this.id = params.user_id
    this.token = params.token
    this.email = params.email
    this.username = params.username
  }

  async fetch() {
    const user = await appUserModel.get(this.user_id)

    return user
  }

  // todo not sure it should be here
  async createLocalAuth(params?: { email?: string; password?: string}) {
    let { email, password } = params || {}
    if (!email) email = `${uuid()}@mail.com`
    if (!password) password = uuid()

    const auth_local_id = await accountLocalModel.create({
      email,
      password,
      account_id: this.account_id,
    })

    return {
      auth_local_id,
      email,
      password,
    }
  }

  async setContacts() {
    await userContactsModel.create({
      account_id: this.account_id,
      email: this.email,
      phone_number: null,
    })
  }

  async createDevice() {
    const id = uuid()
    await deviceMobileModel.create({ id })
    await deviceUserMobileModel.create({ mobile_id: id, user_id: this.user_id })
    return id
  }

  async setUsername(username: string) {
    await usersModel.setUserName({ username, id: this.account_id })
  }
}

export async function createUser(params?: { email?: string }): Promise<TestUser> {
  let { email } = params || {}
  if (!email) email = `${uuid()}@mail.com`

  let name = uuid()
  let username = randomstring.generate({ charset: 'alphabetic', length: 10, capitalization: 'lowercase' })
  const app = await appsModel.getPrimaryApp()
  const account_id = await accountModel.create({ email })
  const user_id = await appUserModel.create({
    account_id, app_id: app.id,
  })
  await usersModel.create({ id: account_id, name, username })
  await userContactsModel.create({ account_id, email })
  const token = await tokensModel.createToken({ user_id, ip: 'test' })

  const testUser = new TestUser({
    account_id, user_id, token, email, username,
  })

  return testUser
}

export default createUser
