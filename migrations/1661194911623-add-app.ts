import client from '@libs/pg'

export default async function () {
  await client.query(`
INSERT INTO public.apps (id, name, is_primary) VALUES ('0f4a3a87-76c3-4616-9f95-c180011557c5', 'Default', true);
  `)
}
