import { Console } from '@/modules/console'
import { Data } from '@/modules/file'
import { CreateService, ICreateService } from '@/validators'
import { PRIMARY_ACTIONS } from './constants'
import { InvalidInputError } from '@/errors'

async function main() {
  // Check the correctness of the data file
  Data.checkFile()

  const cli = new Console()
  const ACTION_RESULT = await cli.choice<typeof PRIMARY_ACTIONS>(
    'What should we do?',
    PRIMARY_ACTIONS
  )

  switch (ACTION_RESULT) {
    case 'SHOW_SERVICES':
      console.log('Showing services...')
      break
    case 'CREATE_SERVICE':
      const name = await cli.ask('Name of your service: ')
      const url = await cli.ask('URL of the pricing page: ')
      const xpath = await cli.ask('XPath of the pricing: ')

      const newService: ICreateService = {
        name,
        url,
        xpath
      }

      const { data: parsedNewService, error } =
        CreateService.safeParse(newService)

      if (error) {
        const fields = error.errors.map(iss => iss.path[0])
        throw new InvalidInputError(`Invalid input at ${fields.join(', ')}.`)
      }

      Data.addLine(parsedNewService)

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
}

// yea :D
main()
