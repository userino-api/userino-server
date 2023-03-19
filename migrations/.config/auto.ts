import migramon from './migramon'
import serviceStartup from "service-startup";

if(!process.env.MIGRATIONS_DISABLED) {
  console.log('addLateStep')
  serviceStartup.addLateStep({
    name: 'Migration',
    async onRun() {
      await migramon.start()
    }
  })
}
