import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CommentService } from './comment.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
// Your controller code here

// create comment controller
const createComment = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string
  const result = await CommentService.createComment({ ...req.body, userId })

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment created successfully',
    data: result,
  })
})

// update comment controller
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await CommentService.updateComment(id, req.body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment updated successfully',
    data: result,
  })
})

// delete comment controller
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  await CommentService.deleteComment(id)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment deleted successfully',
    data: {},
  })
})

// get comment by id controller
const getCommentById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await CommentService.getCommentById(id)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment retrieved successfully',
    data: result,
  })
})

export const CommentController = {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
}
