import express from 'express'
import { CommentController } from './comment.controller'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { commentValidation } from './comment.validation'

// Define your routes here
const router = express.Router()

// create comment route
router.post(
  '/',
  auth,
  validateRequest(commentValidation.createCommentValidation),
  CommentController.createComment,
)

// update comment route
router.put(
  '/:id',
  auth,
  validateRequest(commentValidation.updateCommentValidation),
  CommentController.updateComment,
)

// delete comment route
router.delete('/:id', auth, CommentController.deleteComment)

// get comment by id route
router.get('/:id', auth, CommentController.getCommentById)

export const CommentRoutes = router
