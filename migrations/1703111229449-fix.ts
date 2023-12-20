import client from '@libs/pg'

export default async function () {
  await client.query(`
alter table firebase.accounts
    drop constraint accounts_pk;


  `)
}
