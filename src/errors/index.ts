const CODES = {
  INVALID_OPTION: 'INVALID_OPTION',
  INVALID_INPUT: 'INVALID_INPUT'
}

export class InvalidOptionError extends Error {
  code: string

  constructor(message: string) {
    super(message)
    this.code = CODES.INVALID_OPTION
  }
}

export class InvalidInputError extends Error {
  code: string

  constructor(message: string) {
    super(message)
    this.code = CODES.INVALID_INPUT
  }
}
