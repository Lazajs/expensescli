import readline from 'node:readline'
import inquirer from 'inquirer'
import { InvalidOptionError } from '@/errors/index'

export class Console {
  #rl: readline.Interface
  #inq: typeof inquirer

  constructor() {
    this.#rl = this.init()

    this.#inq = inquirer
  }

  init(): readline.Interface {
    return (this.#rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '>',
      completer: (line: string) => {
        const completions = 'help exit list show'.split(' ')
        const hits = completions.filter(c => c.startsWith(line))
        // Show all completions if none found, else show filtered results
        return [hits.length ? hits : completions, line]
      }
    }))
  }

  ask(question: string): Promise<string> {
    return new Promise(res => {
      let fullAnswer = ''

      this.init()
      this.#rl.question(question, answer => {
        fullAnswer = answer
        this.close()
      })

      if (fullAnswer.length) res(fullAnswer)
    })
  }

  async choice<T extends Record<string, any>>(
    title: string,
    options: T
  ): Promise<keyof T> {
    const keys = Object.keys(options) as Array<keyof T>
    const values = Object.values(options)

    const promptResult = await this.#inq.prompt({
      type: 'list',
      name: 'choice',
      message: title,
      choices: values
    })

    const keyChosen = keys.find(key => options[key] === promptResult.choice)
    if (
      !keyChosen ||
      typeof keyChosen !== 'string' ||
      !keys.includes(keyChosen)
    ) {
      throw new InvalidOptionError(`Invalid option chosen ${String(keyChosen)}`)
    }

    return keyChosen
  }

  close() {
    this.#rl.close()
  }
}
