import configAuthList from '@models/appAuthModel'

async function enableAuth({ key, app_id }: {
  app_id: string
  key: string
}) {
  const changed: number = await configAuthList.setEnabled({ app_id, key, is_enabled: true })

  if (!changed) {
    await configAuthList.create({ app_id, key })
  }
}

async function disableAuth({ key, app_id }: {
  app_id: string
  key: string
}) {
  const changed: number = await configAuthList.setEnabled({
    key,
    is_enabled: false,
    app_id,
  })

  return changed
}

export default {
  enableAuth,
  disableAuth,
}
