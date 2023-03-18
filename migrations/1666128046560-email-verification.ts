import client from '@libs/pg'

export default async function () {
  await client.query(`
create table email_actions
(
    user_id    uuid,
    email      varchar(200) not null,
    code       varchar(200) not null,
    expired_at timestamptz,
    created_at timestamptz default now()
);

alter table email_actions
    add action varchar(30) not null;

alter table email_actions
    add metadata json;
`)

  await client.query(`
create table public.user_contacts
(
    user_id      uuid not null,
    email        varchar(200),
    phone_number varchar(30)
);

insert into user_contacts (user_id, email)
select id, email from accounts;

alter table user_contacts
    rename column user_id to account_id;

alter table user_contacts
    add constraint user_contacts___fk
        foreign key (account_id) references accounts (id);

alter table email_actions
    add is_done bool default false;

  `)
}
