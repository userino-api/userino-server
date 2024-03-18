import client from '@libs/pg'

export default async function () {
  await client.query(`
create table public.user_log
(
    user_id    uuid,
    account_id uuid,
    action     varchar(30),
    created_at timestamptz default now()
);

alter table public.user_log
    add app_id uuid;

alter table public.user_log
    add constraint user_log_apps_id_fk
        foreign key (app_id) references public.apps;


  `)
}
