import { input, select } from '@inquirer/prompts'
import { InvalidOptionError } from '@/errors/index'

export class Console {
  #prompt = '>'

  constructor(prompt?: string) {
    this.#prompt = prompt ?? this.#prompt
  }

  async choice<T extends Record<string, any>>(
    title: string,
    options: T
  ): Promise<keyof T> {
    const keys = Object.keys(options) as Array<keyof T>
    const values = Object.values(options)

    const promptResult = await select({
      choices: values,
      message: title
    })

    const keyChosen = keys.find(key => options[key] === promptResult)
    if (
      !keyChosen ||
      typeof keyChosen !== 'string' ||
      !keys.includes(keyChosen)
    ) {
      throw new InvalidOptionError(`Invalid option chosen ${String(keyChosen)}`)
    }

    return keyChosen
  }

  async ask(message: string): Promise<string> {
    return await input({
      message
    })
  }
}
