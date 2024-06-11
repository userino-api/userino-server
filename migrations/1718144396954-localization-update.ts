import client from '@libs/pg'

export default async function () {
  await client.query(`
alter table public.user_localization
    drop constraint user_localization_app_users_id_fk;

alter table public.user_localization
    rename column user_id to account_id;

alter table public.user_localization
    add constraint user_localization_users_id_fk
        foreign key (account_id) references public.users
            on delete cascade;
  `)
}
