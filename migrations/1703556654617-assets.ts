import client from '@libs/pg'

export default async function () {
  await client.query(`
alter table public.users
    add asset_id varchar(50);


  `)
}
