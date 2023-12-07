// Define your validations here

import { z } from 'zod'

const createCommentValidation = z.object({
  body: z.object({
    body: z.string({ required_error: 'body must be required' }),
    userId: z.string({ required_error: 'userId must be required' }),
  }),
})

const updateCommentValidation = z.object({
  body: z.object({
    body: z.string({ required_error: 'body must be required' }),
  }),
})

export const commentValidation = {
  createCommentValidation,
  updateCommentValidation,
}
