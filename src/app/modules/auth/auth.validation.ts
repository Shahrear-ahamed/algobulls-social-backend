// Define your validations here
import z from 'zod'

// sign up validation
const signUpZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name must be required' }).optional(),
    email: z.string({ required_error: 'email must be required' }).email(),
    password: z
      .string({ required_error: 'password must be required' })
      .min(6, { message: 'password must be greater then 6 character' })
      .max(24, { message: 'password must be less then 24 character' }),
    avatar: z.string({ required_error: 'avatar must be required' }).optional(),
  }),
})

// sign ip validation
const signInZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email must be required' }).email(),
    password: z
      .string({ required_error: 'password must be required' })
      .min(6, { message: 'password must be greater then 6 character' })
      .max(24, { message: 'password must be less then 24 character' }),
  }),
})

// refresh token validation
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password  is required',
    }),
    newPassword: z.string({
      required_error: 'New password  is required',
    }),
  }),
})


export const AuthValidation = {
  signUpZodSchema,
  signInZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
}
