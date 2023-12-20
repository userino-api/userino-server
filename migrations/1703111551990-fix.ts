import client from '@libs/pg'

export default async function () {
  await client.query(`
drop index firebase.accounts_firebase_id_uindex;


  `)
}
