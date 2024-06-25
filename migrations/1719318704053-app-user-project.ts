import client from '@libs/pg'

export default async function () {
  await client.query(`
alter table public.app_users
    add project_id uuid;

alter table public.app_users
    add constraint app_users_projects_id_fk
        foreign key (project_id) references public.projects
            on delete set null;


        update app_users set project_id = (select project_id from apps where apps.id = app_users.app_id);
  `)
}
