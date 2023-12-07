// Define your validations here

import { z } from 'zod'

// create post validation
const createPostValidation = z.object({
  body: z.object({
    body: z.string({ required_error: 'body must be required' }),
    author: z.string({ required_error: 'author must be required' }),
  }),
})

// update post validation
const updatePostValidation = z.object({
  body: z.object({
    body: z.string({ required_error: 'body must be required' }),
  }),
})

export const PostValidation = {
  createPostValidation,
  updatePostValidation,
}
