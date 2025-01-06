import { z } from 'zod'

export const InputValidator = z
  .string({ message: 'Input must be a string' })
  .min(1, { message: 'Input must be at least 1 character long' })
  .max(100, { message: 'Input must be less than 100 characters long.' })

export const CreateService = z.object({
  name: InputValidator,
  url: InputValidator,
  xpath: InputValidator
})

export type ICreateService = z.infer<typeof CreateService>
