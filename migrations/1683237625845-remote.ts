import client from '@libs/pg'

export default async function () {
  await client.query(`
create schema remote;

create table remote.sessions
(
    id          uuid,
    user_id     uuid,
    is_approved boolean,
    expires_at  timestamptz,
    created_at  timestamptz default now(),
    metadata    json
);


  `)
}
