// @ts-ignore
import CustomError from 'custom-error-class'

const CODES = {
  INVALID_OPTION: 'INVALID_OPTION'
}

export class InvalidOptionError extends CustomError {
  code: string
  constructor(message: string) {
    super(message)
    this.code = CODES.INVALID_OPTION
  }
}
