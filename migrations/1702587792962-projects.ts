import client from '@libs/pg'

export default async function () {
  await client.query(`
create table public.projects
(
    id         uuid,
    name       varchar(300),
    created_at timestamptz default now()
);

alter table public.apps
    add project_id uuid;
  `)

  await client.query(`
insert into projects (id, name)
select id, name from apps;

update apps set project_id = id;
`)

  await client.query(`
    alter table public.apps
      add constraint apps_projects_id_fk
          foreign key (project_id) references public.projects (id)
              on delete set null;
              
              alter table public.users
    add project_id uuid;
    
    alter table public.accounts
    add project_id uuid;


  `)

  await client.query(`
  alter table devices.browsers
    drop constraint browsers_app_users_id_fk;

alter table devices.browsers
    add constraint browsers_app_users_id_fk
        foreign key (user_id) references public.app_users
            on delete cascade;

alter table devices.user_mobiles
    drop constraint user_mobiles_app_users_id_fk;

alter table devices.user_mobiles
    add constraint user_mobiles_app_users_id_fk
        foreign key (user_id) references public.app_users
            on update cascade;
`)

  await client.query(`
    DELETE FROM public.app_users WHERE id = '64e7ce82-db62-4cce-b745-dd62e1d06ea9'
    DELETE FROM public.app_users WHERE id = 'c954fa49-51f0-4c67-8988-9d6ceb09eda1'
    
    
update accounts
set project_id = (select app_id from app_users where account_id = accounts.id limit 1)
`)

  await client.query(`
  alter table public.users
    drop column project_id;

alter table firebase.accounts
    add project_id uuid;


update firebase.accounts
set project_id = (select project_id from accounts where accounts.id = firebase.accounts.account_id )
`)

  await client.query(`
  alter table firebase.app_configs
    drop constraint app_configs_apps_null_fk;

alter table firebase.app_configs
    rename column app_id to project_id;

alter table public.projects
    add constraint projects_pk
        primary key (id);

alter table firebase.app_configs
    add constraint app_configs_projects_id_fk
        foreign key (project_id) references public.projects (id)
            on update cascade;

alter table firebase.users
    add project_id uuid;
`)


  await client.query(`
  alter table public.accounts
    alter column project_id set not null;

alter table media.app_configs
    rename column app_id to project_id;

alter table public.app_auth_list
    rename constraint app_auth_list_pk to project_auth_list_pk;

alter table public.app_auth_list
    rename to project_auth_list;

alter table public.project_auth_list
    rename column app_id to project_id;


 `)
}
