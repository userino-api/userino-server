import client from '@libs/pg'

export default async function () {
  await client.query(`
create table public.user_localization
(
    user_id      uuid
        constraint user_localization_pk
            primary key,
    time_zone    text,
    country_iso2 varchar(2),
    country_iso3 varchar(3)
);

alter table public.user_localization
    add language varchar(100);

alter table public.user_localization
    add languages json;



  `)

  await client.query(`
  create schema devices;
  
create table devices.browsers
(
    user_id    uuid not null,
    id         uuid
        constraint browsers_pk
            primary key,
    created_at timestamptz default NOW()
);

alter table public.user_localization
    add constraint user_localization_app_users_id_fk
        foreign key (user_id) references public.app_users;



`)

  await client.query(`
  alter table devices.browsers
    add language varchar(100);

alter table devices.browsers
    add languages json;

alter table devices.browsers
    add constraint browsers_app_users_id_fk
        foreign key (user_id) references public.app_users;

alter table public.user_localization
    add created_at timestamptz default now();

alter table public.user_localization
    add updated_at timestamptz default now();

alter table public.tokens
    add ip text;

alter table public.tokens
    add device_type varchar(20);


`)

  await client.query(`
  alter table firebase.users
    alter column created_at set default now();

alter table devices.browsers
    add time_zone varchar(100);


`)
}
