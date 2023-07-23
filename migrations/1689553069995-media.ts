import client from '@libs/pg'

export default async function () {
  await client.query(`
create schema media;

create table media.app_configs
(
    app_id        uuid,
    client_id     uuid,
    client_secret varchar(200),
    is_working    integer,
    created_at    timestamptz default now(),
    updated_at    timestamptz default now()
);


  `)
}
