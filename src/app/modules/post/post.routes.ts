import express from 'express'
import { PostController } from './post.controller'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { PostValidation } from './post.validation'

// Define your routes here
const router = express.Router()

// create post
router.post(
  '/',
  auth,
  validateRequest(PostValidation.createPostValidation),
  PostController.createPost,
)

// update post
router.put(
  '/:id',
  auth,
  validateRequest(PostValidation.createPostValidation),
  PostController.updatePost,
)

// delete post
router.delete('/:id', auth, PostController.deletePost)

// get post
router.get('/:id', auth, PostController.getPost)

// get all posts
router.get('/', auth, PostController.getMyPosts)

export const PostRoutes = router
