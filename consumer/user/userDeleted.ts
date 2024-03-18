import coreEventList from '../../events/coreEventList'

export default async function userDeleted(params: Parameters<typeof coreEventList['appUserDeleted']>[0]) {
  const { id, account_id, app_id } = params
  console.log('userDeleted', params)
}
