import client from '@libs/pg'

export default async function () {
  await client.query(`
create table firebase.app_configs
(
    app_id     uuid,
    config     json,
    is_valid   boolean,
    created_at timestamptz,
    updated_at timestamptz
);

alter table firebase.app_configs
    add constraint app_configs_pk
        primary key (app_id);

alter table firebase.app_configs
    add constraint app_configs_apps_null_fk
        foreign key (app_id) references apps (id);
  `)

  await client.query(`
  alter table firebase.app_configs
    alter column created_at set default now();

  alter table firebase.app_configs
    alter column updated_at set default now();
`)

  await client.query(`
create table app_auth_list
(
    key        varchar(100)
        constraint auth_list_pk
            primary key,
    is_enabled boolean     default false,
    created_at timestamptz default now()
);

`)

  await client.query(`
alter table app_auth_list
          add app_id uuid;
          
alter table app_auth_list        
          alter column app_id set not null;
          
          alter table app_auth_list
    add constraint app_auth_list_pk
        primary key (app_id, key);

     alter table app_auth_list
          add constraint app_auth_list_pk
              primary key (app_id, key);
              
              

  `)
}
