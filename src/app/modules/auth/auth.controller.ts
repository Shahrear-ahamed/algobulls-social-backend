import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AuthService } from './auth.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { Cookie } from '../../../utils/cookie'

// Your controller code here

// sign up user controller
const signUp = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await AuthService.signUp(body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message:
      'Register successfully, we send you an email to verify your account',
    data: result,
  })
})

// sign in user controller
const signIn = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const { refreshToken, ...result } = await AuthService.signIn(body)

  // set refresh token to cookie
  Cookie.setCookie(res, refreshToken, 7)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfully',
    data: result,
  })
})

// refresh token and send access token controller
const getAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  const result = await AuthService.getAccessToken(refreshToken)

  // set refresh token to cookie
  Cookie.setCookie(res, refreshToken, 7)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfully',
    data: result,
  })
})

// change password controller
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const profileId = req.user?.id as string
  const result = await AuthService.changePassword(profileId, body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password changed successfully',
    data: result,
  })
})

// bookmark post controller
const bookmarkPost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id
  const profileId = req.user?.id as string
  const result = await AuthService.bookmarkAPost(profileId, postId)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookmark post successfully',
    data: result,
  })
})

export const AuthController = {
  signUp,
  signIn,
  getAccessToken,
  changePassword,
  bookmarkPost,
}
