import express from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import auth from '../../middlewares/auth'

// Define your routes here
const router = express.Router()

// api end points for auth

// sign-up
router.post(
  '/sign-up',
  validateRequest(AuthValidation.signUpZodSchema),
  AuthController.signUp,
)

// sign-in
router.post(
  '/sign-in',
  validateRequest(AuthValidation.signInZodSchema),
  AuthController.signIn,
)

// refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.getAccessToken,
)

// change password
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword,
)

// bookmark post
router.put('/bookmark/:id', auth, AuthController.bookmarkPost)

export const AuthRoutes = router
