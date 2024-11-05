import { Chromium, createService } from './lib/use-browser'
import { Console } from './lib/use-console'

export const PRIMARY_ACTIONS = {
  SHOW_SERVICES: 'Show services',
  CREATE_SERVICE: 'Create service',
  SHOW_EXPENSES: 'Show expenses table',
  HEALTH_CHECK: 'This is working!', // todo => remove
  EXIT: 'Exit'
} as const
;(async () => {
  const cli = new Console()

  // const createdService = createService({ name: "Youtube", path: "xpath" });
  // const browser = new Chromium(createdService);
  // await cli.ask("What is your name? ").then((name) => {
  //   console.log(`Hello, ${name}!`);
  //   cli.close();
  // });

  const ACTION_RESULT = await cli.choice<typeof PRIMARY_ACTIONS>(
    'What should we do?',
    PRIMARY_ACTIONS
  )

  switch (ACTION_RESULT) {
    case 'SHOW_SERVICES':
      console.log('Showing services...')
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
      console.log('Invalid action')
  }
})()
