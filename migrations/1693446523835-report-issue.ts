import client from '@libs/pg'

export default async function () {
  await client.query(`
create schema issues;

create table issues.issues
(
    id          uuid,
    created_at  timestamptz default now(),
    updated_at  timestamptz default now(),
    text        text,
    data        json,
    status      varchar(100),
    app_id      uuid,
    app_user_id uuid not null
);


alter table issues.issues
    add constraint issues_pk
        primary key (id);

alter table issues.issues
    add constraint issues_app_users_id_fk
        foreign key (app_user_id) references public.app_users
            on delete cascade;



  `)
}
