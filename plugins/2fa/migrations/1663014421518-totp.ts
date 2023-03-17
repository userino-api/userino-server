import client from '@libs/pg'

export default async function () {
  await client.query(`
create schema authenticator;
create table authenticator.user_secrets
(
\tuser_id uuid not null,
\tsecret text,
\tcreated_at timestamptz default now()
);

create unique index user_secrets_user_id_uindex
\ton authenticator.user_secrets (user_id);

alter table authenticator.user_secrets
\tadd constraint user_secrets_pk
\t\tprimary key (user_id);



  `)
}
