import configAuthList from '@models/appAuthModel'

async function enableAuth({ key, project_id }: {
  project_id: string
  key: string
}) {
  const changed = await configAuthList.setEnabled({ project_id, key, is_enabled: true })

  if (!changed) {
    await configAuthList.create({ project_id, key })
  }
}

async function disableAuth({ key, project_id }: {
  project_id: string
  key: string
}) {
  const changed = await configAuthList.setEnabled({
    key,
    is_enabled: false,
    project_id,
  })

  return changed
}

export default {
  enableAuth,
  disableAuth,
}
