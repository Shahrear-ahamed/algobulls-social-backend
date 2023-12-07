import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IChangePassword, IReturnToken, IUser } from './auth.interfaces'
import config from '../../../config'
import User from './auth.model'
import { BcryptPassword } from '../../../utils/bcryptPass'
import { TokenServices } from '../../../utils/token'

// Your service code here
const signUp = async (payload: IUser) => {
  const result = await User.create(payload)

  // if result is null, throw error
  if (!result)
    throw new ApiError(
      httpStatus.UNPROCESSABLE_ENTITY,
      'Unable to create profile',
    )

  return result
}

// login with email and password
const signIn = async (payload: Partial<IUser>): Promise<IReturnToken> => {
  const { email, password } = payload

  // find user by email
  const result = await User.findOne({ email })

  // if result is null, throw error ()
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, 'Password or email is incorrect')

  // now check password
  const isMatch = await BcryptPassword.comparePassword(
    password!,
    result.password,
  )

  // if password is not match, throw error
  if (!isMatch)
    throw new ApiError(httpStatus.NOT_FOUND, 'Password or email is incorrect')

  // create token for user
  const tokenPayload = {
    id: result._id,
    email: result.email,
  }

  const accessToken = await TokenServices.generateToken(tokenPayload)
  const refreshToken = await TokenServices.generateRefreshToken(tokenPayload)

  // return access token and refresh token for direct login after sign up
  return {
    accessToken,
    refreshToken,
  }
}

// get access token from refresh token
const getAccessToken = async (
  token: string,
): Promise<Partial<IReturnToken>> => {
  // verify refresh token
  const result = await TokenServices.verifyToken(
    token,
    config.jwt.refresh_token_secret as string,
  )

  // if result is null, throw error
  if (!result) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

  // find user by profileId for check user exist or not
  const user = await User.findOne({ _id: result.id })

  // if user is null, throw error
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

  // create token for user
  const tokenPayload = {
    id: result.id,
    email: result.email,
  }

  const accessToken = await TokenServices.generateToken(tokenPayload)

  // return access token
  return { accessToken }
}

// change password of user, if user is logged in
const changePassword = async (
  profileId: string,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  // find user by profileId for user existence
  const user = await User.findById({ _id: profileId })

  // if user is null, throw error
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  // check old password is correct or not
  const isMatch = await BcryptPassword.comparePassword(
    oldPassword,
    user.password,
  )

  // if password is not match, throw error
  if (!isMatch)
    throw new ApiError(httpStatus.NOT_FOUND, 'Your old password is incorrect')

  // hash new password
  const hashPass = await BcryptPassword.hashedPassword(newPassword)

  // update password
  const result = await User.updateOne(
    { _id: profileId },
    { password: hashPass },
  )

  // is anything wrong, throw error
  if (!result)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong')
}

// bookmarked posts
const bookmarkAPost = async (userId: string, postId: string) => {
  const query = { _id: userId }

  const findUser = await User.findById(userId)

  if (!findUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  // Check if the user has already bookmarked the post
  const isBookmarked = findUser.bookmarks.includes(postId)

  console.log(isBookmarked)

  // If the user has already bookmarked the post, remove it
  if (isBookmarked) {
    await User.updateOne(query, {
      $pull: { bookmarks: postId },
    })
  } else {
    // If the user has not bookmarked the post, add it
    await User.updateOne(query, {
      $addToSet: { bookmarks: postId },
    })
  }

  // Return the updated post
  return User.findById(query)
}

export const AuthService = {
  signUp,
  signIn,
  getAccessToken,
  changePassword,
  bookmarkAPost,
}
