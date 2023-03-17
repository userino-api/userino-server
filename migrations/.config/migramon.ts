import client from '@libs/pg'
import Migrator from '@migramon/migrate'
import { PgPlugin, PgStore } from '@migramon/postgres-plugin'
import * as fs from "fs";

const pgPlugin = new PgPlugin({ client })
const store = new PgStore({
  client,
  async onInit() {
    const dumpFile = fs.readFileSync('./migrations/.config/init-dump.sql', 'utf8')
    await client.query(dumpFile)
  }
})

const migramon = new Migrator({
  store, plugins: [pgPlugin],
})


export default migramon
