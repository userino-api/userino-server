import client from '@libs/pg'

export default async function () {
  await client.query(`
alter table user_contacts
    add is_email_verified boolean;


  `)
}
