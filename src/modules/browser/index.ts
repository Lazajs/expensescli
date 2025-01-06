import playwright from 'playwright'
import { type IEngine } from '@/types'

type BrowserOptions = 'chromium'

export class Chromium<IEngine> {
  #browser: typeof playwright.chromium

  constructor(private serviceName: BrowserOptions) {
    this.#browser = playwright[serviceName]
  }
}
