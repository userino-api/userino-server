import { Config } from './settings'

const {
  PG,
} = process.env || {}

const confDev: DeepPartial<Config> = {
  pgConnectionString: PG,
}

export default confDev
