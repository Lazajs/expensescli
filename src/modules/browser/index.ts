import playwright from 'playwright'
import { type IEngine } from '@/types'

interface MonthlyService {
  path: string // element xpath
  name: string // service name
}

// the class might receive a new object of type MonthlyService
export function createService({ name, path }: MonthlyService): MonthlyService {
  return { name, path }
}

export class Chromium<IEngine> {
  constructor(private service: MonthlyService) {}

  public getServiceName() {
    return this.service.name
  }
}
