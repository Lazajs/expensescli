export interface IEngine {
  init(): Promise<void>
  newContext(): Promise<any>
  close(): Promise<void>
}

export interface IService {
  id: string
  name: string
  url: string
  xpath: string
}

export type ValueOf<T> = T[keyof T]
