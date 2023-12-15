import serviceStartup from 'service-startup'
import client from '@libs/pg'

serviceStartup.addPrioritizedSteps([
  {
    name: 'PostgreSQL',
    onRun:  () => client.connect(),
  },
])
