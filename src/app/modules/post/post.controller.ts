import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { PostService } from './post.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
// Your controller code here

const createPost = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await PostService.createPost(body)

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

export const PostController = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getMyPosts,
}
