import migramon from './migramon'
import serviceStartup from "service-startup";

if(!process.env.MIGRATIONS_DISABLED) {
  serviceStartup.addLateStep({
    name: 'Migration',
    async onRun() {
      await migramon.start()
    }
  })
}
