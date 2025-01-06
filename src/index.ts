import { Console } from '@/modules/console'
import { Data } from '@/modules/services'

export const PRIMARY_ACTIONS = {
  SHOW_SERVICES: 'Show services',
  CREATE_SERVICE: 'Create service',
  SHOW_EXPENSES: 'Show expenses table',
  HEALTH_CHECK: 'This is working!', // todo => remove
  EXIT: 'Exit'
} as const
;(async () => {
  Data.checkFile()
  const cli = new Console()
  // Principal menu
  const ACTION_RESULT = await cli.choice<typeof PRIMARY_ACTIONS>(
    'What should we do?',
    PRIMARY_ACTIONS
  )

  switch (ACTION_RESULT) {
    case 'SHOW_SERVICES':
      console.log('Showing services...')
      Data.checkFile()
      break
    case 'CREATE_SERVICE':
      console.log('Creating service...')
      break
    case 'SHOW_EXPENSES':
      console.log('Showing expenses...')
      break
    case 'HEALTH_CHECK':
      console.log('Health check...')
      break
    case 'EXIT':
      console.log('Exiting...')
      break
    default:
      console.log('Invalid action.\n')
  }
})()
