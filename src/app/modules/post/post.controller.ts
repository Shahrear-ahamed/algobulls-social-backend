import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { PostService } from './post.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
// Your controller code here

const createPost = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string
  const payload = { ...req.body, author: userId }
  const result = await PostService.createPost(payload)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Your post has been created successfully',
    data: result,
  })
})

// update post
const updatePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body
  const result = await PostService.updatePost(id, body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your post has been updated successfully',
    data: result,
  })
})

// delete post
const deletePost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await PostService.deletePost(id)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your post has been deleted successfully',
    data: result,
  })
})

// get post
const getPost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await PostService.getPost(id)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your post has been retrieved successfully',
    data: result,
  })
})

// get my posts
const getMyPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string
  const result = await PostService.getMyPosts(userId)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your posts have been retrieved successfully',
    data: result,
  })
})

// get all posts
const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string
  const result = await PostService.getAllPosts(userId)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your posts have been retrieved successfully',
    data: result,
  })
})

// like a post
const likeAPost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id
  const userId = req.user?.id as string

  console.log(postId, userId)

  const post = await PostService.likeAPost(postId, userId)

  return res.status(httpStatus.OK).json({
    data: post,
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post liked successfully',
  })
})

// my liked posts
const getMyLikedPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string
  const result = await PostService.getMyLikedPosts(userId)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your liked posts have been retrieved successfully',
    data: result,
  })
})

// my bookmarked posts
const getMyBookmarkedPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string
  const result = await PostService.getMyBookmarkedPosts(userId)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your bookmarked posts have been retrieved successfully',
    data: result,
  })
})

// get all comments of a post
const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id
  const result = await PostService.getAllComments(postId)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments retrieved successfully',
    data: result,
  })
})

export const PostController = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getMyPosts,
  getAllPosts,
  likeAPost,
  getMyLikedPosts,
  getMyBookmarkedPosts,
  getAllComments,
}
