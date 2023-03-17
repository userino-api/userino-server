import keys from './lib/authKeys'
import eventController from './lib/eventController'

const coreEventList = {
  // async ping() {
  //   const id = keys.PING
  //   const event = keys.PING
  //   const event_group_id = event
  //
  //   return sqsPublisher.sendCoreEvent({
  //     id, event, data: {}, group_id: event_group_id,
  //   })
  // },

  async userCreated(data: {
    id: string
  }) {
    const event = keys.USER_CREATED
    await eventController.sendEvent({ event, data })
  },

  async userDeleted(data: {
    id: string
  }) {
    const event = keys.USER_DELETED
    await eventController.sendEvent({ event, data })
  },

  async userAuthorized(data: {
    user_id: string
  }) {
    const event = keys.APP_USER_AUTHORIZED
    await eventController.sendEvent({ event, data })
  },

  async appUserCreated(data: { id: string; account_id: string; app_id: string }) {
    const event = keys.APP_USER_CREATED
    await eventController.sendEvent({ event, data })
  },

  async appUserDeleted(data: { id: string; account_id: string; app_id: string }) {
    const event = keys.APP_USER_DELETED
    await eventController.sendEvent({ event, data })
  },

  async userRequest(data: {
    id: string
  }) {
    const event = keys.APP_USER_REQUEST
    await eventController.sendEvent({ event, data })
  },

  async emailVerification(data: { user_id: string; account_id: string; app_id: string; email: string; code: string }) {
    const event = keys.USER_EMAIL_VERIFICATION
    await eventController.sendEvent({ event, data })
  },
}

export default coreEventList
