import readline from 'node:readline'
import inquirer from 'inquirer'
import { type ValueOf } from '../types'
import { InvalidOptionError } from '../modules/errors/index'

export class Console {
  #rl: readline.Interface
  #inq: typeof inquirer

  constructor() {
    this.#rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '>',
      completer: (line: string) => {
        const completions = 'help exit list show'.split(' ')
        const hits = completions.filter(c => c.startsWith(line))
        // Show all completions if none found, else show filtered results
        return [hits.length ? hits : completions, line]
      }
    })

    this.#inq = inquirer
  }

  ask(question: string) {
    return new Promise(resolve => {
      this.#rl.question(question, resolve)
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
