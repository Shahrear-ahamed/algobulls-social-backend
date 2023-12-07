import express from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'

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

export const AuthRoutes = router
