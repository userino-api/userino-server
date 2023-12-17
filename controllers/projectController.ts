import appModel from '@models/appModel'
import projectAdminModel from '@models/projectAdminModel'
import projectModel from '@models/projectModel'

async function createProject({ name, user_id }: { name: string; user_id: string }) {
  const project_id = await projectModel.create({
    name,
  })

  await projectAdminModel.create({ project_id, admin_id: user_id })

  // auto create app
  await appModel.create({ name, project_id })

  return project_id
}

async function deleteProject({ project_id }: { project_id: string }) {
  await projectModel.delete(project_id)
  // todo send event
}

export default {
  createProject,
  deleteProject,
}
