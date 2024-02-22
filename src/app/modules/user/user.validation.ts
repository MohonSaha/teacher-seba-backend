import { z } from 'zod'

const createUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be a string',
    })
    .max(20, { message: 'password can not be more than 20 cahrecters' }),
})

export const UserValidations = {
  createUserValidationSchema,
}
