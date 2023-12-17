import client from '@libs/pg'

export default async function () {
  await client.query(`
create table public.project_admins
(
    project_id uuid not null
        constraint project_admins_projects_id_fk
            references public.projects,
    user_id    uuid
);

alter table public.project_admins
    add created_at timestamptz default now();


  `)
}
