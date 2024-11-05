export interface IEngine {
  init(): Promise<void>
  newContext(): Promise<any>
  close(): Promise<void>
}

export type ValueOf<T> = T[keyof T]
