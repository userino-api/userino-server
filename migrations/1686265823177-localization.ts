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

alter table public.tokens
    alter column device_id type varchar(50) using device_id::varchar(50);


create table devices.mobiles
(
    id             varchar(50),
    user_id        uuid,
    column_name    integer,
    device_id      varchar(50),
    device_name    varchar(200),
    model          varchar(200),
    manufacturer   varchar(200),
    system_name    varchar(100),
    system_version varchar(100),
    data           json,
    created_at     timestamptz default now(),
    updated_at     timestamptz default now()
);

alter table devices.mobiles
    drop column column_name;

alter table devices.mobiles
    rename column device_id to device;

alter table devices.mobiles
    add constraint mobiles_app_users_id_fk
        foreign key (user_id) references public.app_users;

alter table devices.mobiles
    add constraint mobiles_pk
        primary key (user_id, id);

alter table devices.mobiles
    rename column device to device_key;



`)

  await client.query(`
  create table firebase.fcm_tokens
(
    user_id    uuid          not null,
    token      varchar(2000) not null,
    device_id  varchar(50),
    created_at timestamptz default now()
);

alter table firebase.fcm_tokens
    add constraint fcm_tokens_app_users_id_fk
        foreign key (user_id) references public.app_users;

alter table firebase.fcm_tokens
    add updated_at timestamptz default now();



`)

  await client.query(`
  alter table devices.mobiles
    add country varchar(2);

alter table devices.mobiles
    add language varchar(2);

alter table devices.mobiles
    add language_tag varchar(50);

alter table devices.mobiles
    add languages json;

alter table devices.mobiles
    add time_zone varchar(100);

create table devices.user_mobiles
(
    user_id uuid
);
alter table devices.user_mobiles
    add mobile_id varchar(50);

alter table devices.user_mobiles
    add created_at timestamptz default now();

alter table devices.user_mobiles
    add updated_at timestamptz default now();

alter table devices.user_mobiles
    add constraint user_mobiles_pk
        primary key (user_id, mobile_id);

alter table devices.user_mobiles
    add constraint user_mobiles_app_users_id_fk
        foreign key (user_id) references public.app_users;

`)

  await client.query(`
  alter table devices.mobiles
    drop column user_id;

alter table devices.mobiles
    add constraint mobiles_pk
        primary key (id);

alter table devices.browsers
    add updated_at timestamptz default now();
 
 alter table devices.mobiles
    add brand varchar(100);
    
    
    alter table devices.mobiles
    drop column data;


`)
}
