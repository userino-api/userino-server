import migramon from "./migramon"
import serviceStartup from "service-startup";

async function setup() {
  await serviceStartup.start()
  return migramon
}

export default setup
