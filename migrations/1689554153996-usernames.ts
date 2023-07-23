import client from '@libs/pg'

export default async function () {
  await client.query(`
alter table public.users
    add username varchar(50);


create index users_username_index
    on public.users (username);


  `)
}
