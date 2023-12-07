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

// like a post
router.post('/:id/like', auth, PostController.likeAPost)

// delete post
router.delete('/:id', auth, PostController.deletePost)

// get my posts
router.get('/my-posts', auth, PostController.getMyPosts)

// get all posts
router.get('/', auth, PostController.getAllPosts)

// get my liked posts
router.get('/my-liked-posts', auth, PostController.getMyLikedPosts)

// get post
router.get('/:id', auth, PostController.getPost)

export const PostRoutes = router
