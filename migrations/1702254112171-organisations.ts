import client from '@libs/pg'

export default async function () {
  await client.query(`
create schema organisations;
alter table public.users
    add type varchar(20);

update users set type = 'user';

create table organisations.organisation_admins
(
    organisation_id uuid,
    app_user_id     uuid,
    created_at      timestamptz
);


alter table organisations.organisation_admins
    alter column created_at set default now();


  `)
}
