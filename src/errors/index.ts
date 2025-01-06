const CODES = {
  INVALID_OPTION: 'INVALID_OPTION'
}

export class InvalidOptionError extends Error {
  // extending Error class allows to check if 'obj instanceof Error'
  code: string
  constructor(message: string) {
    super(message)
    this.code = CODES.INVALID_OPTION
  }
}
