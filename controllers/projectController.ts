import projectModel from '@models/projectModel'

async function deleteProject({ project_id }: { project_id: string }) {
  await projectModel.delete(project_id)
  // todo send event
}

export default {
  deleteProject,
}
